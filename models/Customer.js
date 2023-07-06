import mongoose from "mongoose";
import validator from "validator";

const CustomerSchema = new mongoose.Schema(
  {
    CustomerId: {
      type: String,
      required: [true, "please provide Customer Id"],
      maxlength: 12,
    },

    FirstName: {
      type: String,
      required: [true, "please provide Customer First Name"],
      maxlength: 50,
    },

    LastName: {
      type: String,
      required: [true, "please provide Customer Last Name"],
      maxlength: 50,
    },

    ContactNumber: {
      type: Number,
      required: [true, "please provide Customer Contact Number"],
      maxlength: 10,
      minlength: 10,
    },

    Address: {
      type: String,
      required: [true, "please provide Customer Address"],
      maxlength: 100,
    },

    DateOfBirth: {
      type: Date,
      required: [true, "please provide Customer Date Of Birth"],
    },

    EmailAddress: {
      type: String,
      required: [true, "please provide Customer Email Address"],
      maxlength: 50,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },

    CustomerType: {
      type: String,
      enum: ["normalCustomer", "loyaltyCustomer"],
      default: "normalCustomer",
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },

  { timestamps: true }
);

export default mongoose.model("Customer", CustomerSchema);
