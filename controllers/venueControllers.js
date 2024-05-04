const VenueModel = require("../models/venueModel");
const nodemailer = require("nodemailer");

exports.getAddVenues = (req, res) => {
  res.render("addvenues");
};

exports.postAddVenues = async (req, res) => {
  const vendorUsername = req.session.username;

  try {
    const venueData = {
      username: vendorUsername,
      ownerName: req.body.ownerName,
      venueName: req.body.venueName,
      address: req.body.address,
      contact: req.body.contact,
      email: req.body.email,
      services: req.body.services,
      openingtime: req.body.openingtime,
      closingtime: req.body.closingtime,
    };

    const existingVenue = await VenueModel.findOne({
      ownerName: venueData.ownerName,
      venueName: venueData.venueName,
      contact: venueData.contact,
      email: venueData.email,
    });

    if (existingVenue) {
      return res.status(400).send("Venue with the same information already exists");
    } else {
      await VenueModel.create(venueData);
      await sendvendorConfirmationEmail(venueData.email);
      res.render("venueconfirm");
    }
  } catch (error) {
    console.error("Error occurred during adding venue:", error);
    res.status(500).send("Error occurred during adding venue");
  }
};

async function sendvendorConfirmationEmail(userEmail) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email@gmail.com",
        pass: "your_password",
      },
    });

    await transporter.sendMail({
      from: "your_email@gmail.com",
      to: userEmail,
      subject: "Booking Confirmation",
      text: "Your venue has been added to the website. Thank you for choosing our service!",
    });

    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw new Error("Error occurred while sending confirmation email.");
  }
}

