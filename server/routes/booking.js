const router = require("express").Router();

const Booking = require("../models/Booking");

// create booking

router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });

    await newBooking.save()
    res.status(200).json(newBooking)

  } catch (err) {
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
});

module.exports = router