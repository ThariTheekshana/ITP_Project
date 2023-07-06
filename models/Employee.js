import mongoose from "mongoose";
import validator from "validator";
const EmployeeSchema = new mongoose.Schema(
  {
    EmployeeID: {
      type: Number,
      required: [true, "please provide Employee ID"],
      maxlength: 50,
    },

    EmployeeName: {
      type: String,
      required: [true, "please provide EmployeeName"],
      maxlength: 50,
    },
    EmployeeNIC: {
      type: Number,
      required: [true, "please provide Employee NIC"],
      maxlength: 12,
      minlength: 12,
    },

    EmployeeAddress: {
      type: String,
      required: [true, "please provide Employee Address"],
      maxlength: 100,
    },

    EmployeeContactNumber: {
      type: Number,
      required: [true, "please provide Employee Contact Nunber"],
      maxlength: 10,
      minlength: 10,
    },

    EmployeeEmail: {
      type: String,
      required: [true, "please provide Employee Email"],
      maxlength: 50,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },

    EmployeeAge: {
      type: Number,
      required: [true, "please provide Employee Age"],
      maxlength: 2,
      minlength: 2,
    },

    EmployeeGender: {
      type: String,
      enum: ["male", "female"],
      default: "male",
    },

    EmployeePosition: {
      type: String,
      enum: ["manager", "admin", "cashier", "technician", "delivery person"],
      default: "manager",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },

  { timestamps: true }
);

export default mongoose.model("Employee", EmployeeSchema);
