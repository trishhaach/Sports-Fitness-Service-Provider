const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/nodeAPI")
  .then(() => {
    console.log("database connected in login model");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const LoginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const LoginModel = mongoose.model("login", LoginSchema);

module.exports = LoginModel;
