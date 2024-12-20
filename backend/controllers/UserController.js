const ErrorHandler=require("../utils/errorHandler")
const catchAsyncError=require("../middleware/catchAsyncError");

const User=require("../models/Usermodel");
const sendToken = require("../utils/jwtToken");

const sendEmail=require("../utils/sendEmail")


// This is registeruser Model 
exports.registerUser=catchAsyncError(async(req,res,next)=>{
     const {name,email,password}=req.body;

     console.log("Your name is ",name)
    const user=await User.create({
        name,email,password,
        avatar:{
            public_id:"This is sample id",
            url:"profillepicUrl"
        }
    });


    // const token=user.getJWTToken();
     
    // res.status(201).json({
    //     success:true,
    //     user,
    //     token,
    // })
    sendToken(user,201,res);
})



// Login User 

exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please Enter the password and email id ",400))
    }


    const user=await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Email Or Password",401))
    } 

    const isPasswordMatched=user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email Or Password",401))
    }

    // const token=user.getJWTToken();
    // res.status(200).json({
    //     success:true,
    //     token,
    // })

    sendToken(user,200,res);
}
)



// Logout user 

exports.logout=catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    res.status(200).json({
        success:true,
        message:"LogOut successFully"
    })
})



// Forget password
exports.forgetPassword=catchAsyncError(async(req,res,next)=>{

    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found ",404))
    }
    //Get  Reset password  Token
    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false})

    const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`


    const message=`Your  password reset token is :- \n\n${resetPasswordUrl}\n\nIf You have not requested  this email then  please ignore it`;


    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery `,
            message,

        })

        res.status(200).json({
            success:true,
            message:`Email send to ${user.email}  successfully `
        })
        
    } catch (error) {

        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false})

        return next(new ErrorHandler(error.message,500))
        
    }

})


// Reset password
exports.resetPassword=catchAsyncError(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    });
    if(!user){
        return next(new ErrorHandler("Reset Password Token is invailid or has been expire",400))

}
if(req.body.password != req.body.confirmPassword){
    return next(new ErrorHandler("Password does not ",400))

}
user.password=req.body.password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;

await user.save();
sendToken(user,200,res);

})



exports.getUserDetails=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user,
    })

})


// Updat User Password 
exports.updateUserPassword=catchAsyncError(async(req,res,next)=>{

    const user=await User.findById(req.user.id).select("+password")
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect ",400))

    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400))
    }

    user.password=req.body.newPassword;
    await user.save();

    sendToken(user,200,res)

     
})


// update user  User Profile
exports.updateUserProfile=catchAsyncError(async(req,res,next)=>{
    const newuserDate={
        name:req.body.name,
        email:req.body.email,

    }

    // We will add 

    const user= await User.findByIdAndUpdate(req.user.id,newuserDate)

    res.status(200).json({
        success:true,

    })

})


//  Get All User 

exports.getAllUser=catchAsyncError(async(req,res,next)=>{
    const users=await User.find()
    res.status(200).json({
        success:true,
        users,
    })

})


// Get Single User Details 
exports.getUser=catchAsyncError(async(req,res,next)=>{
    console.log("Hello I am Here")
    const user=await User.findById(req.params.id)
    

    if(!user){
        return next(new ErrorHandler("User not find User this Id",400))
    }

    res.status(200).json({
        success:true,
        user,
    })
})


// Update user Role usind admin

exports.updateUserRole=catchAsyncError(async(req,res,next)=>{
    const newuserDate={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,

    }

    // We will add 

    const user= await User.findByIdAndUpdate(req.params.id,newuserDate)

    res.status(200).json({
        success:true,

    })

})



// Delete User -- Admin 
exports.deleteUser=catchAsyncError(async(req,res,next)=>{
    
   
     // We will remove cloudinary later

    
    const user= await User.findById(req.params.id)
    if(!user){
    return next(new ErrorHandler(`User does not exit  with id : ${req.params.id}`))
    }

    await user.deleteOne();
    res.status(200).json({
        success:true,
        user,
    })
})

 