const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { 
        type: String, require: true
     },
    city: { type: String, require: true },
    state: { type: String, require: true },
    country: { type: String, require: true },
    pincode: { type: Number, require: true },
    PhoneNo: {
      type: Number,
      require: true,
    },
  },
  orderItems:[
    {
        name:{
            type:String,
            require:true,
        },
        price:{
            type:
                String,require:true,
            
        },
        quenty:{
            type:String,
            require:true
        },
        image:{
            type:String,
            require:true
        },
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"Product",
            require:true
        }
    }
  ],

  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    require:true

  },
  paymentInfo:{
    id:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    },



  },
  paidAt:{
    type:Date,
    require:true
  },
  itemPrice:{
    type:Number,
    default:0
  },
  textPrice:{
    type:Number,
    default:0
  },
  shippingPrice:{
    type:Number,
    default:0,
  },
  totalPrice:{
    type:Number,
    default:0
  },
  oredrStatus:{
    type:String,
    require:true,
    default:"Processing"
  },
  deliveredAt:Date,
  cretedDate:{type:Date,default:Date.now(),
}


});

module.exports=mongoose.model("order",orderSchema)
