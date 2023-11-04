import jwt from "jsonwebtoken"
import createError from "../utils/errors.js";


export default (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(createError({status:401,message:'unauthorised'}));
    }
    return jwt.verify(token,process.env.JWT_SECRETE,(err,decoded)=>{
        if(err){
            return next(createError({status:401,message:'Invalid token'}));
        }
        req.user = decoded;
        return next();
    })
}