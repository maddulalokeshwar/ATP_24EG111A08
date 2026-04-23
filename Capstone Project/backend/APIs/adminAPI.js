import exp from 'express'
import { userModel } from '../models/usermodel.js'
import { verifyToken } from '../middleware/verifyToken.js'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const { sign } = jwt

export const adminApp = exp.Router()

//Admin login
adminApp.post('/login', async (req, res) => {
        const { email, password } = req.body

        // check admin
        const admin = await userModel.findOne({ email: email })

        if (!admin)
            return res.status(400).json({ message: "Invalid email" })

        if (admin.role !== "ADMIN")
            return res.status(403).json({ message: "Access denied. Not an admin" })

        if (admin.isUserActive === false)
            return res.status(403).json({ message: "Admin account is blocked" })

        // compare password
        const isMatched = await compare(password, admin.password)

        if (!isMatched)
            return res.status(400).json({ message: "Invalid password" })

        // create token
        const token = sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        )

        // send cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        })

        let adminObj = admin.toObject()
        delete adminObj.password

        res.status(200).json({
            message: "Admin login successful",
            payload: adminObj
        })
})


// Get all users and Authors
adminApp.get('/users', verifyToken("ADMIN"), async (req, res) => {
    try {
        const usersList = await userModel.find({
            role: { $in: ["USER", "AUTHOR"] }
        }).select("-password")

        res.status(200).json({
            message: "Users & Authors fetched successfully",
            payload: usersList
        })

    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
})


// Block or Activate a user
adminApp.put('/user-status', verifyToken("ADMIN"), async (req, res) => {
    try {
        const { userId, isUserActive } = req.body

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" })
        }

        const user = await userModel.findById(userId)

        if (!user)
            return res.status(404).json({ message: "User not found" })

        user.isUserActive = isUserActive
        await user.save()

        res.status(200).json({
            message: `User is now ${isUserActive ? "ACTIVE" : "BLOCKED"}`
        })

    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
})
