const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/nodeAPI")
  .then(() => {
    console.log("database connected in signup model");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const SignupSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
});

const SignupModel = mongoose.model("signup", SignupSchema);

module.exports = SignupModel;
