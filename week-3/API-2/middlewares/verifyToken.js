import jwt, { decode } from 'jsonwebtoken'
const {verify}=jwt
export function verifyToken(req,res,next){
    //token verification logic
    //We need to add a cookie parser middleware to extract the cookie from the body of the request otherwise req.cookie is undefined
    const token =req.cookies?.token
    //if token is undefined
    if(!token)
        return res.status(401).json({message:"plz  login"})
    //if token is existed
    try{
    const decodedToken=verify(token,'abcdef')//secret key
    req.user=decodedToken
    console.log(decodedToken)
    //call next
    next()
    }catch(err){
        res.status(401).json({message:"Session expired, pls re-login"})
    }
}