const ErrorHandler = require('../utils/errorhandler');
const catchAsycnError = require('./catchAsyncError')
const jwt = require("jsonwebtoken");
const User = require('../models/userModels')


exports.isAuthenticatedUser = catchAsycnError(async(req, res, next)=>{
    const {token} = req.cookies;
    //above and below both things are same it is just that above we have used destructring
    // const token = req.cookies.token;
    
    if(!token){
        return next(new ErrorHandler("Please login to access to resources",401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
});