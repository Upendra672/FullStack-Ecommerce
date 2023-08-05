const ErrorHandler = require("../utils/errorhandler");
const catchAsycnError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");


//user authentication
exports.isAuthenticatedUser = catchAsycnError(async (req, res, next) => {
  const { token } = req.cookies;
  //above and below both things are same it is just that above we have used destructring
  // const token = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler("Please login to access to resources", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  next();
});

//user authorization to acces controls
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
