import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../model/user.model.js";
import { connectDB } from "../lib/db.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();
    const adminDetails = {
      name: "adminname",
      email: "adminemail",
      password: "password",
      role: "admin",
    };

    const adminExist = await User.findOne({ email: adminDetails.email });
    if (adminExist) {
      return console.log("Admin already exist");
    }
    const newAdmin = new User(adminDetails);
    await newAdmin.save();
    console.log("Admin created successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding admin:", error.message);
    process.exit(1);
  }
};

// node backend/seeder/seedAdmin.js
// use this to run the seeder file to create new admin user
// if need create new admin user run this file again with new user info

seedAdmin();
