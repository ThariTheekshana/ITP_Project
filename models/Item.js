import mongoose from "mongoose"

const ItemSchema = new mongoose.Schema({

ItemId:{
    type:Number,
    //required: [true,'please provide Item Id'],
    maxlength:4,
},

ItemName:{
    type:String,
    required: [true,'please provide Item name'],
    maxlength:50,
},

ItemBrand:{
    type:String,
    required: [true,'please provide Item Brand'],
    maxlength:50,
},

ItemPurchasePrice:{
    type:Number,
    required: [true,'please provide Item Purchase Price'],
    maxlength:7,
},

ItemSellingPrice:{
    type:Number,
   required: [true,'please provide Item Selling Price'],
    maxlength:7,
},

ItemQuantity:{
    type:Number,
    required: [true,'please provide Item Quantity'],
    maxlength:3,
    minlength:1,
},

ItemBenchQuantity:{
    type:Number,
   required: [true,'please provide Item Bench Quantity'],
    maxlength:3,
    minlength:1,
},

    ItemType: {
      type: String,
      enum: ['Laptops', 'DesktopWorkStations', 'MotherBoards','Processors','GraphicCards','Memory','Storage','Monitors','ExternalStorages','Mouse','KeyBoard','Casings'],
      default: 'Laptops',
    },
    itemSupplier: {
      type: String,
      enum: ['Malith', 'Sasindu', 'Chiran', 'Tharindu'],
      default: 'Malith',
    },
  createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true,'please provide user']
  },
},

{timestamps: true}
)

export default mongoose.model('Item',ItemSchema)

