const express = require("express");
const {
  getMyProfile,
  loginUser,
  createUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const router = express.Router();

router.route("/me").get(auth, getMyProfile);
router.route("/login").post(loginUser);
router.route("/register").post(createUser);

module.exports = router;
