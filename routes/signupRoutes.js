const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupControllers");

router.get("/signup", signupController.getSignup);
router.post("/signup", signupController.postSignup);

module.exports = router;
