const SignupModel = require("../models/signupModel");
const bcrypt = require("bcrypt");

exports.getSignup = (req, res) => {
  res.render("signup");
};

exports.postSignup = async (req, res) => {
  const { username, phonenumber, email, password, confirmpassword } = req.body;

  try {
    if (!username || !password || !confirmpassword) {
      return res.send("Username, password, and confirm password are required");
    }
    if (password !== confirmpassword) {
      return res.send("Password and confirm password do not match");
    }

    if (!isValidPhoneNumber(phonenumber)) {
      return res.send("Invalid phone number format");
    }

    if (!isValidEmail(email)) {
      return res.send("Invalid email format");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await SignupModel.create({
      username,
      phonenumber,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });

    req.session.username = username;

    res.render("login");
  } catch (error) {
    console.error("Error occurred during signup:", error);
    res.send("Error occurred during signup");
  }
};

function isValidPhoneNumber(phoneNumber) {
  return /^\d{10}$/.test(phoneNumber);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

