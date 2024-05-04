const LoginModel = require("../models/loginModel");

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = async (req, res) => {
  const { username, password, loginAs } = req.body;

  try {
    const user = await LoginModel.findOne({ username, password });

    if (user) {
      const userType = loginAs === "vendor" ? "vendor" : "user";

      if (
        req.session.username &&
        req.session.userType &&
        req.session.userType !== userType
      ) {
        return res.redirect(
          `/login?error=You have already logged in as ${req.session.userType}`
        );
      }

      req.session.username = user.username;
      req.session.userType = userType;

      const existingLoginActivity = await LoginActivityModel.findOne({
        username: user.username,
        userType: userType,
      });

      if (!existingLoginActivity) {
        await LoginActivityModel.create({
          username: user.username,
          userType: userType,
          password: user.password,
          loginTime: new Date(),
        });
      }

      if (userType === "vendor") {
        return res.redirect("/vendorhome");
      } else {
        return res.redirect("/userhome");
      }
    } else {
      console.log("User not found");
      return res.redirect("/login?error=Invalid credentials");
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
    res.status(500).send("Error occurred during login");
  }
};

