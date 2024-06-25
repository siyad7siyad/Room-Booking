const router = require("express").Router()

const Booking = require("../models/Booking")
const User = require("../models/User")
const Listing = require("../models/Listing")

// get trip list

router.get("/:userId/trips",async(req,res)=>{
  try{
    const {userId} = req.params
    const trips = await Booking.find({customerId:userId}).populate("cutomerId hostId listingId")
    res.status(202).json(trips)
  }catch(err){
    res.status(404).json({message:"cannot find trips",error:err.message})
  }
})

// add wishList
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId).populate('wishList');
    const listing = await Listing.findById(listingId);

    if (!user || !listing) {
      return res.status(404).json({ message: "User or listing not found" });
    }

    // Initialize wishList if it's undefined
    if (!user.wishList) {
      user.wishList = [];
    }

    const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId);

    if (favoriteListing) {
      user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId);
      await user.save();
      return res.status(200).json({ message: "Listing is removed from wish list", wishList: user.wishList });
    } else {
      user.wishList.push(listing);
      await user.save();
      return res.status(200).json({ message: "Listing is added to wish list", wishList: user.wishList });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

// get propertyList

router.get("/:userId/properties",async(req,res)=>{
  try{
    const {userId} = req.params
    const properties = await Listing.find({creator:userId}).populate("creator")
    res.status(202).json(properties)
  }catch(err){
    res.status(404).json({message:"cannot find properties",error:err.message})
  }
})



module.exports = router