const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/nodeAPI")
  .then(() => {
    console.log("database connected in booking model");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const BookingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  numberofpeople: {
    type: String,
    required: true,
  },
  services: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue", // Reference to the VenueModel
  },
});

const BookingModel = mongoose.model("booking", BookingSchema);

module.exports = BookingModel;
