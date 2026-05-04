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
  try {
    console.log("REGISTER BODY:", req.body);

    const userObj = req.body;

    if (userObj.role === "ADMIN") {
      return res.status(400).json({ message: "Registration failed as role is ADMIN" });
    }

    userObj.password = await hash(userObj.password, 12);

    const newUserDoc = new userModel(userObj);
    await newUserDoc.save();

    console.log("USER SAVED:", newUserDoc._id);

    res.status(201).json({
      message: "User created successfully",
      payload: newUserDoc
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});
//Route for login
commonApp.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    //user not found
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // block check
    if (user.isUserActive === false) {
      return res.status(403).json({
        message: "Your account is blocked"
      });
    }

    //password safety check
    if (!user.password) {
      return res.status(500).json({
        message: "User password missing in DB"
      });
    }

    const isMatched = await compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({
      message: "Login successful",
      payload: userObj
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({
      message: err.message
    });
  }
});
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