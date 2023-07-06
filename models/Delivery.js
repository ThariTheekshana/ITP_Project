import mongoose from "mongoose";

const DeliverySchema = new mongoose.Schema(
  {
    DeliveryId: {
      type: Number,
      required: [true, "Please Provide delivery ID"],
      maxlength: 15,
    },

    customerName: {
      type: String,

      maxlength: 50,
    },

    phoneNo: {
      type: Number,
      required: [true, "Please Provide contact number"],
      maxlength: 10,
      minlength: 10,
    },

    deliveryAddress: {
      type: String,
      required: [true, "Please Provide address"],
      maxlength: 50,
    },

    deliveryPerson: {
      type: String,
      required: [true, "Please Provide delivery person name"],
      maxlength: 50,
    },

    receivedDate: {
      type: Date,
      required: [true, "Please Provide received date"],
      maxlength: 8,
    },

    dispatchDate: {
      type: Date,
      required: [true, "Please Provide dispatch date"],
      maxlength: 8,
    },

    DeliveryStatus: {
      type: String,
      enum: ["Pending", "Pre-transit", "Out for delivery", "Delivered"],
      default: "Pending",
    },

    deliveryCharge: {
      type: String,
      required: [true, "Please Provide delivery charge"],
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },

  { timestamps: true }
);

export default mongoose.model("Delivery", DeliverySchema);
