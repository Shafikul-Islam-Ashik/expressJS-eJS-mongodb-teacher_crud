import mongoose from "mongoose";

// create mongodb connection
export const mongodbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongodb connection successful`.bgBlue.black);
  } catch (error) {
    console.log(`Mongodb connection failed`.bgRed.black);
  }
};
