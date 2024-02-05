 
module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";



    // Wrong Mongodb Id Error 
    if(err.name==="CastError"){
        const message=`Resource not Found. Invalide: ${err.path}`;
        err=new ErrorHandler(message,400);
    }


    // mongose duplicate error function
    if(err.code===11000){
        const message=`Duplicate ${object.keys(err.keyvalue)} Entered`;
        err=new ErrorHandler(message,400)
    }

    // Wrong JWT error
    if(err.name==="JsonWebTokenError"){
        const message=`Json web Token is invalid , try again`
        err=new ErrorHandler(message,400)
    }
    // JWT Expire Error
    if(err.name==="TokenExpiredError"){
        const message=`Json Web Token is Expire , Try again`;
        err=new ErrorHandler(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,

    })

}