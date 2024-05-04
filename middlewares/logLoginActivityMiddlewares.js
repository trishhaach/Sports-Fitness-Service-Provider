const LoginActivityModel = require("../models/loginActivityModel");


async function logLoginActivity(req, res, next) {
  try {
    if (req.session.username && req.session.userType) {
      const loginActivity = new LoginActivityModel({
        username: req.session.username,
        userType: req.session.userType,
        loginTime: new Date(),
      });
      await loginActivity.save();
    } else {
      console.error(
        "Error logging login activity: Username or userType not found in session"
      );
    }
    next();
  } catch (error) {
    console.error("Error logging login activity:", error);
    next(error);
  }
}

module.exports = logLoginActivity;
