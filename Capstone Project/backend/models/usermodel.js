import {Schema,model} from 'mongoose'
import { profile, timeStamp } from 'node:console'

const userSchema=new Schema({
    FirstName:{
        type:String,
        required:[true,'First name is mandatory']
    },
    LastName:{
        type:String
    },
    email:{
        type:String,
        required:[true,'eMail is required'],
        unique:[true,'eMail already exists']
    },
    password:{
        type:String,
        required:[true,'password is mandatory'],
        minlength:[5,'Minimum length is 5']
    },
    role:{
        type:String,
        enum:["USER","AUTHOR","ADMIN"],
        required:[true,"Invalid role"]
    },
    profileImageUrl:{
        type:String
    },
    isUserActive:{
        type:Boolean,
        default:true

    }
},
  { 
  timestamps:true,
  versionKey:false,
  strict:"throw"
}
)

//Generate User Model
export const userModel=model("user",userSchema)