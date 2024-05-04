const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginControllers");


router.get("/login", loginController.getLogin);
router.post("/login", loginController.postLogin);

module.exports = router;
