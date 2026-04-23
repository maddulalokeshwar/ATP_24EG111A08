import exp from "express"
import {config} from "dotenv"
import {connect} from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import {employeeApp} from "./APIs/EmployeeAPI.js"

config()


//create exp app
const app = exp()

app.use(cors({
  origin: ["http://localhost:5173"]
}))

//cookie parser middleware
app.use(cookieParser())
//Body parser middleware
app.use(exp.json())

//path level middleware
app.use("/employee-api", employeeApp)

const connectDB = async()=>{
    try{
        console.log(process.env.DB_URL)
        await connect(process.env.DB_URL)
        console.log("DB connected successfully")
        //ASSIGN PORT 
        const port = process.env.PORT || 6161
        app.listen(port, ()=>console.log(`Server is running on port ${port}`))
    } catch (error) {
        console.error("Error connecting to DB:", error)
    }
}
connectDB()

//to handle invalid path
app.use((req, res, next) => {
    console.log(req.url)
    res.status(404).json({message: `Path ${req.url} is invalid`})
})

//Error handling middleware
app.use((err, req, res, next) => {
  console.log("error is ",err)
  console.log("Full error:", JSON.stringify(err, null, 2));
  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  //send server side error
  res.status(500).json({ message: "error occurred", error: "Server side error" });
}); 