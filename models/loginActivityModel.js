const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/nodeAPI")
  .then(() => {
    console.log("database connected in login activity");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const loginActivitySchema = new mongoose.Schema({
  username: { type: String, required: true },
  userType: { type: String, enum: ["user", "vendor"], required: true },
  password: { type: String, required: true },
  loginTime: { type: Date, default: Date.now },
});

const LoginActivityModel = mongoose.model("LoginActivity", loginActivitySchema);

module.exports = LoginActivityModel;
