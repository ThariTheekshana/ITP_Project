import mongoose from "mongoose"
import validator from "validator"

const SupplierSchema = new mongoose.Schema({

SupplierId:{
    type:Number,
    required: [true,'please provide Supplier Id'],
    maxlength:4,
    
},

supplierName:{
    type:String,
    required: [true,'please provide Supplier name'],
    maxlength:50,
},

supplierEmail:{
      type:String,
      required: [true,'please provide Supplier Email'],
      maxlength:50,
      validate: {
    validator: validator.isEmail,
    message: 'Please provide a valid email',
    },
  },

supplierContactNo:{
    type:Number,
    required: [true,'please provide Contact No'],
    maxlength:10,
minlength:10,
},

supplierAddress:{
    type:String,
    required: [true,'please provide Supplier Address'],
    maxlength:100,
},

    SupplierType: {
      type: String,
      enum: ['Laptops', 'DesktopWorkStations', 'MotherBoards','Processors','GraphicCards','Memory','Storage','Monitors','ExternalStorages','Mouse','KeyBoard','Casings'],
      default: 'Laptops',
    },
    
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true,'please provide user']
  },
},

{timestamps: true}
)

export default mongoose.model('Supplier',SupplierSchema)

