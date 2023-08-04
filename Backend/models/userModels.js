const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name should be greater than 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please ente the your email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please ente the password"],
    minLength: [8, "Password should be greater than 8 characters"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


//encrypting password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});


//JWT TOKEN
userSchema.methods.getJWTTOKEN = function (){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
  });
};



// compare password

userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model("User", userSchema);
