import jwt from 'jsonwebtoken'
const {verify}=jwt
import {config} from 'dotenv'
config();
export const verifyToken=(...allowedRoles)=>{
    return (req,res,next)=>{
            try{
    //get token from cookie
    const token =req.cookies?.token;
    //check token is existed or not
    if(!token)
        return res.status(401).json({message:"Please login first"})
    //validate token 
    let decodedToken=verify(token,process.env.SECRET_KEY)
    //chech whether the roles are matching or not
    if(!allowedRoles.includes(decodedToken.role))
        return res.status(403).json({message:"Sorry you are not authorised"})
    //add decodedtoken
    req.user=decodedToken;
    next()
    }catch(err){
        res.status(401).json({message:"Verify token failed"})
    }
    }
}