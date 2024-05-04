const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/nodeAPI")
  .then(() => {
    console.log("database connected in venue model");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const VenueSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    venueName: {
        type: String,
        required: true
    },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  services: {
    type: String,
    required: true,
  },
  openingtime: {
    type: String,
    required: true,
  },
  closingtime: {
    type: String,
    required: true,
  },
  venueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
  },
});

VenueSchema.index({ name: 1, contact: 1 }, { unique: true });

const VenueModel = mongoose.model("Venue", VenueSchema);

module.exports = VenueModel;
