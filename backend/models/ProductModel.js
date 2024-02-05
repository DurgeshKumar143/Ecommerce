const mongoose=require("mongoose");


const productSchema=new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter product Name"],
        trim:true
},
description:{
    type:String,
    required:[true,"Please Enter priduct Discription"],
},
price:{
    type:Number,
    required:[true,"Please Enter the price "],
    maxLength:[8,"Price con't exced 8 characters"]
},
ratings:{
    type:Number,
    default:0,
},
images:[
    {
    public_id:{
        type:String,
        required:true
    },

    url:{
        type:String,
        required:true
    }
}

],
category:{
    type:String,
    required:[true,"Please Enter the product category"],

},
stock:{
    type:Number,
    require:[true,"Please enter the product Stock"],
    maxLength:[4,"Stock con't exceed 4 characters"],
    default:1
},
numOfReviews:{
    type:Number,
    default:0
},
reviews:[
    {
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:false,
        
        },
        name:{
            type:String,
            require:true,
        },
        rating:{
            type:Number,
            require:true,
        },
        comment:{
            type:String,
            require:true
        }
    }
],


createdAt:{
    type:Date,
    default:Date.now
}

})


module.exports=mongoose.model("Product",productSchema);