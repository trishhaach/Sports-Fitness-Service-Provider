const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venueControllers");

router.get("/addvenues", venueController.getAddVenues);
router.post("/addvenues", venueController.postAddVenues);

module.exports = router;
