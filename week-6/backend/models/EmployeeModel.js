import {Schema, model} from "mongoose"

const employeeSchema = new Schema({
    name:{
        type:String,
        required:[true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters long"]
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique: [true, "Email already exists"],
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
    },
    mobile:{
        type:String,
        required: [true, "Enter your mobile number"],
        minLength: [10, "Mobile number must be 10 digits long"],
        maxLength: [10, "Mobile number must be 10 digits long"]
    },
    designation:{
        type:String,
        required:[true, "Designation is required"],
    },
    companyName:{
        type:String,
        required:[true, "Company name is required"]
    }
},
{
    timestamps: true,
    versionKey: false,
    strict: "throw"
})

export const EmployeeModel = model("employee", employeeSchema)
// export default EmployeeModel
// export default EmployeeModel