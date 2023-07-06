import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    PaymentId: {
      type: Number, //required: [true,'please provide Payment Id'],
      maxlength: 4,
    },

    CustomerName: {
      type: String,
      required: [true, "please provide Item Selling Price"],
      maxlength: 50,
    },

    MobileNumber: {
      type: Number,
      required: [true, "please provide Item Bench Quantity"],
      maxlength: 10,
      minlength: 10,
    },

    PaymentMethod: {
      type: String,
      enum: ["Cash", "Card"],
      default: "Cash",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "please provide user"],
    },
  },

  { timestamps: true }
);

export default mongoose.model("Payment", PaymentSchema);
