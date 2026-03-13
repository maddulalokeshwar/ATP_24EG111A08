import exp from 'express'
import cookieParser from 'cookie-parser'
import {connect} from 'mongoose'
import { userApp } from './APIs/UserAPI.js'
import {productApp} from './APIs/ProductAPI.js'
import {config}from 'dotenv'
const app=exp()
//body parser middleware
app.use(exp.json())
const port = process.env.PORT || 4000
//add cookie parser middleware
app.use(cookieParser())
//forward to userAPI route
app.use("/user-api",userApp)
//forward to product route
app.use("/product-api",productApp)
config()
async function connectDB(){
    try{
        await connect(process.env.DB_URL);
        console.log("database connection success");
        app.listen(port, () =>
            console.log(`server listening to port ${port}...`)
        )
    }catch(err){
        console.log("The error occured is :",err)
    }
}
connectDB()

//error handling middleware
app.use((err,req,res,next)=>{
    console.log(err.name)
    if(err.name==="ValidationError")
        return res.status(400).json({message:"error occurred",error:err.message})
    if(err.name==="CastError")
        return res.status(400).json({message:"error occurred",error:err.message})
    res.status(500).json({message:"error occurred",error:"Server Side error"})
})