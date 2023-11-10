import mongoose from "mongoose";

//User schema
const userSchema = mongoose.Schema({
  f_name: {
    type: String,
    required: true,
    trim: true,
  },
  l_name: {
    type: String,
    trim: true,
  },
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    trim: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    enum: ["male", "female", "custom"],
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  photo: {
    type: String,
    default: "product_avatar.png",
  },
  status: {
    type: Boolean,
    default: true,
  },
});

// create User Model
export default mongoose.model("User", userSchema);
