//Create mini express app(Seperate route)
import exp from 'express'
import {hash,compare} from 'bcryptjs'
import {userModel} from '../models/UserModel.js'
import {verifyToken} from '../middlewares/verifyToken.js'
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
const {sign}=jwt
export const userApp=exp.Router()
//Define user rest api routes
//User login
userApp.post('/auth',async(req,res)=>{
    //get user cres
    const {email,password}=req.body
    //Verify email
    const reqUser=await userModel.findOne({email:email})
    //email not verified
    if(!reqUser)
        return res.status(400).json({message:"Invalid email"})
    //Compare password
    let checkStatus=await compare(password,reqUser.password)
    if(checkStatus===false)
        return res.status(400).json({message:"Invalid password"})
    //if passwords matched 
     //create token
     const signedToken=sign({email:reqUser.email},"abcdef",{expiresIn:"1D"})
     //send res//sss cfrf cross site scripting attack 
    //store token as http cookie only cookie
    res.cookie("token",signedToken,{
        httpOnly:true,
        sameSite:"lax",//lax stands for relaxed restrictions
        secure:false
    })
    res.status(200).json({message:"login success",payload:reqUser})
})
//Create new user
userApp.post("/users",async(req,res)=>{
    //get the new user obg from req
    const newUser=req.body
    //hash the password
    let hashedPass=await hash(newUser.password,13)
    //Replace it with the original password
    newUser.password=hashedPass
    //Create a new user document
    const newUserDocument=new userModel(newUser)
    //save
    await newUserDocument.save()
    //send res//sss xss
    res.status(201).json({message:"User created"})
})
userApp.get("/users",verifyToken,async(req,res)=>{
    //Read all the users from db
   let userList= await userModel.find()
   //send res
   res.status(201).json({message:"The users are as follows",payload:userList})
})
//Read a user by ObjectID
userApp.get("/user",verifyToken,async(req,res)=>{
    //Read email from res.user
    let emailOfUser=req.user?.email
    //find user by email
    const userObj=await userModel.findOne({email:emailOfUser}).populate("cart.product")
    //send res
    if(!userObj)
        return res.status(404).json({message:"User not found"})
    res.status(200).json({message:"The object is found",payload:userObj})
})
//Update user by iD
userApp.put("/users/:id",verifyToken,async(req,res)=>{
    //read the user 
    let eMail=req.user?.email
    //find user and update the user
    const updatedUser=await userModel.findByIdAndUpdate(eMail,{$set:{...modifiedUser}},{new:true,runValidators:true})
    modifiedUser.password = await hash(modifiedUser.password,13)
    //send res
    res.status(200).json({message:"The user is updated successfully",payload:updatedUser})
})
//Delete user by iD
userApp.delete("/users/:id",verifyToken,async(req,res)=>{
    //Get the user id that need to be deleted 
    const uid=req.params.id;
    //Find the user and delete the user in db
    const deletedUser=await userModel.findByIdAndDelete(uid)
    if(!deletedUser)
        return res.status(404).json({message:"User not found"})
    res.status(200).json({message:"User deleted",payload:deletedUser})
})
// userApp.put("/cart/product-id/:pid",verifyToken,async (req,res) => {
//     let productId=req.params.pid;
//     //get current user details
//     const emailOfUser=req.user?.email
//     //add product to the cart
//     let result=await userModel.findOneAndUpdate({email:emailOfUser},{$push:{cart:{product:productId}}})
//     if(!result)
//         return res.status(404).json({message:"User not found"})
//     res.status(200).json({message:"Product added to cart"})
    
// })
userApp.put("/cart/product-id/:pid",verifyToken,async (req,res) => {
    let productId=req.params.pid;
    //get current user details
    const emailOfUser=req.user?.email
    //Search whether the product exist in cart or not
    let res1=await userModel.findOne({email:emailOfUser})
    console.log(res1.cart)
    //add product to the cart
    let result=await userModel.findOneAndUpdate({email:emailOfUser},{$push:{cart:{product:productId}}})
    if(!result)
        return res.status(404).json({message:"User not found"})
    res.status(200).json({message:"Product added to cart"})
    
})