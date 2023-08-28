const { User } = require("../models/userModel");

const createUser = async (req, res, next) => {
  try {
    let user = new User({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
    });

    user = await user.save();

    const token = user.generateAuthToken();

    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select([
      "-role",
      "-password",
      "-createdAt",
      "-updatedAt",
    ]);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid email or password.");
    }

    if (req.body.password !== user.password) {
      return res.status(400).send("Invalid email or password.");
    }

    const token = user.generateAuthToken();

    res.json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

exports.createUser = createUser;
exports.getMyProfile = getMyProfile;
exports.loginUser = loginUser;
