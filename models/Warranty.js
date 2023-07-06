import mongoose from "mongoose"

const WarrantySchema = new mongoose.Schema({

WarrantyId:{
    type:Number,
    required: [true,'please provide Warranty Id'],
    maxlength:4,
},

ItemName:{
    type:String,
    required: [true,'please provide Item Name'],
    maxlength:50,
},

ItemBrand:{
    type:String,
    required: [true,'please provide Item Brand'],
    maxlength:50,
},


WarrantyStartedDate:{
    type:Date,
    required: [true,'please provide Date'],
    
},

WarrantyPeriod:{
    type:String,
    required: [true,'please provide Warranty Period'],
    maxlength:100,
},

WarrantyExpiredDate:{
    type:String,
   required: [true,'please provide Date'],
    maxlength:20,
},

    WarrantyStatus: {
      type: String,
      enum: ['Valid', 'Expired'],
      default: 'Valid',
    },

  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true,'please provide user']
  },



},

{timestamps: true}
)

export default mongoose.model('Warranty',WarrantySchema)

