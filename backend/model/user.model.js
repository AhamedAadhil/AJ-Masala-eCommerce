import mongoose, { Mongoose } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minlength: [6, "Password should be greater than 6 characters"],
    },
    phone: {
      type: Number,
      required: false,
    },
    address: {
      no: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    cartItems: [
      {
        quantity: { type: Number, default: 1 },
        unitPrice: { type: Number },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    role: {
      type: String,
      default: "customer",
      enum: ["admin", "customer"],
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "hold"],
      default: "active",
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// pre-save hook to hash password before save in db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
// schema level function to compare password when login
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
