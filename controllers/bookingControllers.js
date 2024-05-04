const BookingModel = require("../models/bookingModel");
const VenueModel = require("../models/venueModel");
const nodemailer = require("nodemailer");

exports.getBooking = async (req, res) => {
  const venueId = req.query.venueId;
  res.render("booking", { venueId });
};

exports.postBooking = async (req, res) => {
  const { username, phonenumber, email, numberofpeople, services, date, time } = req.body;

  try {
    const venue = await VenueModel.findById(req.query.venueId);

    if (!venue) {
      return res.status(404).send("Venue not found");
    }

    const bookingData = {
      username,
      phonenumber,
      email,
      numberofpeople,
      services,
      date,
      time,
      venue: venue._id,
    };

    const existingBooking = await BookingModel.findOne({ username, date, time });

    if (existingBooking) {
      return res.status(400).send("You have already booked a venue at the same date and time.");
    }

    await BookingModel.create(bookingData);

    await senduserConfirmationEmail(email);

    res.render("bookingconfirm");
  } catch (error) {
    console.error("Error occurred during booking:", error);
    res.status(500).send(error.message);
  }
};

async function senduserConfirmationEmail(userEmail) {
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
      text: "Your booking has been confirmed. Thank you for choosing our service!",
    });

    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw new Error("Error occurred while sending confirmation email.");
  }
}
