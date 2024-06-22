const router = require("express").Router();
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

// configure multer file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // store uploaded files
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    // use orginal file name
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage });

// user Register

router.post("/register", uploads.single("profileImage"), async (req, res) => {
  try {
    // take all information from form
    const { firstName, lastName, email, password } = req.body;

    // upload file availble on req.file
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("no file uploaded");
    }

    // path of uploaded profile image
    const profileImagePath = profileImage.path;

    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "user is already exists" });
    }

    // hash the password
    const salt = await bycrypt.genSalt();
    const hashedPassword = await bycrypt.hash(password, salt);

    // create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    // save the user
    await newUser.save();

    // send succesful message
    res.status(200).json({ message: "user registered succesful" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});

// user login
router.post("/login", async (req, res) => {
  try {
    // take the information from the form
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user doesn't exists" });
    }

    // compare password with hashed pasword

    const isMatch = await bycrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).json({message:"invalid credentials"})
    }

    // genrate jwt token
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    delete user.password

    res.status(200).json({token,user})

  } catch (err) {
    console.log(err);
    res.status(500).json({error:err.message})

  }
});

module.exports = router;
