const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingControllers");

router.get("/booking", bookingController.getBooking);
router.post("/booking", bookingController.postBooking);

module.exports = router;
