const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    lowercase: true,
  },
  middle_name: {
    type: String,
    required: [false, "Middle name is required"],
    trim: true,
    lowercase: true,
  },
  last_name: {
    type: String,
    required: [false, "Last name is required"],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: [true, "Email is already registered"],
    validate: validateEmail,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please Enter a valid email address",
    ],
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
    required: true,
  },
  date_Of_birth: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

async function validateEmail(email) {
  if (!validator.isEmail(email))
    throw new Error("Email Id is not valid.");
}

const User = mongoose.model("Users", userSchema);

module.exports = User;
