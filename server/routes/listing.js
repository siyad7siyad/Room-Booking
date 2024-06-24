const express = require("express");
const router = express.Router();
const multer = require("multer");
const Listing = require("../models/Listing");

// configure multer file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // store uploaded files
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    // use original file name
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// create listing
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    // take the information from form
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;
    if (!listingPhotos) {
      return res.status(400).send("No file uploads");
    }

    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities, // Ensure amenities are parsed correctly
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    await newListing.save();

    res.status(200).json(newListing);
  } catch (err) {
    res.status(409).json({ message: "Failed to create listing", error: err.message });
    console.error(err);
  }
});

// get Listing
router.get("/", async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator");
    } else {
      listings = await Listing.find();
    }

    res.status(200).json(listings);
  } catch (err) {
    res.status(409).json({ message: "Failed to fetch listing", error: err.message });
    console.error(err);
  }
});



// listing details

router.get("/:listingId",async(req,res)=>{
  try{
    const {listingId} = req.params
    const listing = await Listing.findById(listingId).populate("creator")
    res.status(202).json(listing)

  }catch(err){
    res.status(404).json({message:"listing is not found",error:err.message})
  }
})


module.exports = router;