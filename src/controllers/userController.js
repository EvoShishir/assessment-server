const { User } = require("../models/userModel");

function generateOTP() {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

const createUser = async (req, res, next) => {
  const otp = generateOTP();
  try {
    let user = new User({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      otp: otp,
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

const verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        emailConfirmed: req.body.emailConfirmed,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      user,
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
exports.verifyEmail = verifyEmail;
