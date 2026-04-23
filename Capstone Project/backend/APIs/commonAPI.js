import exp from 'express'
import { userModel } from '../models/usermodel.js'
import { hash,compare} from 'bcryptjs'
import {verifyToken} from '../middleware/verifyToken.js'
//import {articleModel} from '../models/articleModel.js'
import jwt from 'jsonwebtoken'
const {sign} =jwt
import { config } from 'dotenv'
config()
export const commonApp = exp.Router()

// Register
commonApp.post('/users', async (req, res) => {
        const userObj = req.body

        if (userObj.role === "ADMIN") {
            return res.status(400).json({message: "Registration failed as role is ADMIN"})
        }

        userObj.password = await hash(userObj.password, 12)

        const newUserDoc = new userModel(userObj)

        await newUserDoc.save()

        res.status(201).json({ message: "User created" })
})
//Route for login
commonApp.post('/login',async(req,res)=>{
    //get user obj from body
    const {email,password}=req.body;
    //find user by email
    const user=await userModel.findOne({email:email});
    //if user not found
    if(!user)
        return res.status(400).json({message:"Login failed ,please check email and try again"})
    //check if the user is blocked or not
    if(user.isUserActive === false)
        return res.status(403).json({message:"Your account is blocked"})
    //compare pass
    const isMatched=await compare(password,user.password)
    //if password not matched
    if(!isMatched)
        return res.status(400).json({message:"Login failed ,please check password and try again"})
    //generate jwt token
    const signedToken=sign({id:user._id,email:email,role:user.role},process.env.SECRET_KEY,{expiresIn:"1h"})

    //set token to res header
    res.cookie("token",signedToken,{
        httpOnly:true,
        sameSite:"lax",//lax stands for relaxed restrictions
        secure:false
    })
    let userObj=user.toObject()
    delete userObj.password
    res.status(200).json({message:"Login successfull",payload:userObj})
    
})
//Route for logout
commonApp.get('/logout',async(req,res)=>{
    // const authorid=req.user?.id;
    // const articleList=await articleModel.find({author:authorid})
    //console.log(articleList)
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    });
    res.status(200).json({message:"Logout successfull"})
})

commonApp.put('/password',verifyToken("AUTHOR","ADMIN","USER"),async(req,res)=>{
    //get new and current pass from the body
    const {currentPassword,newPassword}=req.body;
    //check if the new and current passwords are smae or not
    if(currentPassword===newPassword)
        return res.status(400).json({message:"New password must be different"})
    //get the user password
    const userId=req.user?.id
    const userDoc=await userModel.findById(userId)
    //check if password is matching or not
    const isMatched=await compare(currentPassword,userDoc.password)
    if(!isMatched)
        return res.status(401).json("Please check the entered password")
    //replace the old password with the new password
    const hashedPass=await hash(newPassword,12)
    userDoc.password=hashedPass
    await userDoc.save()
    //return res
    res.status(200).json({message:"Password updated successfully",payload:userDoc})
})