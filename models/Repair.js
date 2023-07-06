import mongoose from "mongoose";
import validator from "validator";

const RepairSchema = new mongoose.Schema(
  {
    RepairId: {
      type: Number,
      // required: [true,'please provide Repair ID'],
      maxlength: 4,
    },

    customerName: {
      type: String,
      required: [true, "please provide customer name"],
      maxlength: 50,
    },

    repairDate: {
      type: String,
      required: [true, "please provide repair date"],
      //default:(new Date().getMonth()),
    },

    returnDate: {
      type: String,
      required: [true, "please provide return date"],
    },

    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: false,
    },

    customerNumber: {
      type: Number,
      required: [true, "please provide customer mobile number"],
      maxlength: 10,
      minlength: 10,
    },

    repairStatus: {
      type: String,
      enum: ["toCompleted", "processing", "completed"],
      default: "toCompleted",
    },

    repairType: {
      type: String,
      enum: ["hardware", "software"],
      default: "hardware",
    },
    IssueDescription: {
      type: String,
      maxlength: 100,
    },
    WarrantyStatus: {
      type: String,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },

  { timestamps: true }
);

export default mongoose.model("Repair", RepairSchema);
