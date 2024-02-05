const Order=require("../models/orderModel")

const Product=require("../models/ProductModel")
const ErrorHander=require("../utils/errorHandler")
const catchAsyncError=require("../middleware/catchAsyncError")



// THis is Creating new order function
exports.newOrder=catchAsyncError(async(req,res,next)=>{

    const {shippingInfo,orderItem,paymentInfo,itemsPrice,textPrice,shippingPrice,totalPrice}=req.body;

    const order=await  Order.create({
        shippingInfo,orderItem,paymentInfo,
        itemsPrice,textPrice,shippingPrice,totalPrice,
        paidAt:Date.now(),
        user:req.user._id,

    });

    res.status(201).json({
        success:true,
        order,
    })
})


// This is to find get single order
exports.getSingleOrder=catchAsyncError(async(req,res,next)=>{

    const order=await Order.findById(req.params.id).populate("user","name email")

   

    if(!order){
        return next(new ErrorHander("Order Not found with this id ",404))
    }

    res.status(200).json({
        success:true,
        order,
    })


})




// get Logged in user Order
exports.myOrders=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id});


    res.status(200).json({
        success:true,
        orders
    })
})


// get ALl Order -- Admin 
exports.getAllOrders=catchAsyncError(async(req,res,next)=>{
    const orders=await Order.find();

    let totalAmout=0;
    orders.forEach(order=>{
        totalAmout+=order.totalPrice;
    })



    res.status(200).json({
        success:true,
        totalAmout,
        orders

    })
})

// update Order --- Admin

exports.updateOrder=catchAsyncError(async(req,res,next)=>{

    const order=await Order.findById(req.params.id);

    if(order.orderStatus==="Delivered"){
        return next( new ErrorHander("You have alert delivered this product",404))
    }


     order.orderItem.forEach(async(o)=>{
        await updateStock(o.product,o.quantity)

     })
    order.orderStatus=req.body.status;

    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now()
    }


  await order.save({ValidateBeforeSave:false})
    res.status(200).json({
        success:true,
        
    })
})



async function updateStock(id,quantity){
    const product=await Product.findById(id)

    product.Stock =product.Stock-quantity

    await product.save({validateBeforeSave:false})

}



// delete Order --- Admin
exports.deleteOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHander("Order Not found ",400))
    }

    res.status(200).json({
        success:true,

    })
})