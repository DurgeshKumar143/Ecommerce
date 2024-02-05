const app=require("./app")


const dotenv=require("dotenv");

const connectDatabase=require("./config/Database")

 
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to Uncaught Exception`)
    process.exit(1)
})

 
dotenv.config({path:"backend/config/config.env"})


// This is data base connect function
connectDatabase();


 const server=  app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
    


})




// unhanled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`)    
    console.log(`Shuting down the server due to Unhandle Promise Rejection`)
    server.close(()=>{
        process.exit(1);
    })

})