const router = require("express").Router()

const Booking = require("../models/Booking")

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

module.exports = router