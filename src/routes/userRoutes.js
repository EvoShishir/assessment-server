const express = require("express");
const {
  getMyProfile,
  loginUser,
  createUser,
  verifyEmail,
} = require("../controllers/userController");

const auth = require("../middleware/auth");
const router = express.Router();

router.route("/me").get(auth, getMyProfile);
router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/confirm-email").post(auth, verifyEmail);

module.exports = router;
