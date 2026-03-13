//Create User Schema 
import {Schema ,model} from "mongoose";

const cartSchema=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"product"//Name of the Model
    },
    count:{
        type:Number,
        default:1
    }
})

const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"Username is mandatory"],
        minlength:[4,"The minimum length of the username should be 4 chars"],
        maxlength:[6,"The maximum length of the username should not exceed 6 chars"]
    },
    password:{
        type:String,
        required:[true,"Password is mandatory"]
    },
    email:{
        type:String,
        required:[true,"Email is manadatory"],
        unique:[true,"Email is already existed"]
    },
    age:{
        type:Number
    },
    cart:[cartSchema]
},
{
    versionKey:false,
    timestamps:true,
},
);

//Generate User Model
export const userModel=model("user",userSchema)