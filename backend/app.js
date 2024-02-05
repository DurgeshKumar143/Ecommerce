const express=require('express')

const app=express();
const errorMiddleware = require('./middleware/error');
const cookieParser=require("cookie-parser")


app.use(express.json())
app.use(cookieParser())

// Route Imports 
const product=require("./routes/ProductRouter");
const user=require("./routes/UserRoute");
const order=require("./routes/OrderRoute")
 


app.use("/api/v1",product)

app.use("/api/v1",user)
app.use("/api/v1",order)

// MeddleWare for Error
app.use(errorMiddleware)



 


module.exports=app