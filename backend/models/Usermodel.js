const mongoose=require("mongoose")
const validator=require("validator")

const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Pleas enter your name "],
        maxLength:[30,"Name Con't exceed 30 Characters"],
        minLength:[4,"Name should have more then 4 characters"]
    } ,
    email:{
        type:String,
        required:[true,"Please enter the user Email id"],
        unique:true,
        validator:[validator.isEmail,"Please enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter your Password"],
        minLength:[8,"Password should be 8 Characters"],
        select:false       
    },
     avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();

    }
    this.password= await bcrypt.hash(this.password,12)

})

// JWT TOken
userSchema.methods.getJWTToken=function(){
   return  jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,

    })

}

// Compare password Method
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)

}


// Generate password Reset Token

userSchema.methods.getResetPasswordToken=function(){
    // Generating reset TOken 

    const resetToken=crypto.randomBytes(20).toLocaleString("hex");

    // Hashing and adding to schema 

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire=Date.now() + 15*60*1000;

    return resetToken;

}


module.exports=mongoose.model("user",userSchema)