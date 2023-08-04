const User = require("../models/userModels");
const ErrorHandler = require("../utils/errorhandler");
const CatchErrorHandler = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");

//Register a user

exports.registerUser = CatchErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profileurl",
    },
  });

  sendToken(user, 201, res);

  // const token = user.getJWTTOKEN();
  // res.status(201).json({
  //   success: true,
  //   token,
  // });
});

//Login users
exports.loginUser = CatchErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or password", 401));
  }

  sendToken(user, 200, res);
});
