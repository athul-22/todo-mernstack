import bcryptjs from "bcryptjs";
import User from '../models/User.js';
import jwt from "jsonwebtoken";
import createError from '../utils/errors.js'
import sentWelcomeEmail from '../utils/sendEmail.js'

export const register = async (req,res,next) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return next(createError({status:400,message:'Name email password required'}));
    }
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
    
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
    
        // WELCOME MAIL FUNCTION FROM UTILS
        sentWelcomeEmail(newUser);
        
        await newUser.save();

        return res.status(201).json('New User Created');
        
      } catch (err) {
        return next(createError({status:400,message:'Name email password required'}));
      }
    };

export const login = async (req,res,next) => {
    if(!req.body.email || !req.body.password){
        return next({status:400,message:'Email password required'});
    }

    try{
        const user = await User.findOne({email: req.body.email}).select('name email password');
        if(!user){
           return next(createError({status:404,message:'No user found'}))
        }

        const isPasswordCorrect = await bcryptjs.compare(req.body.password,user.password);

        if(!isPasswordCorrect){
            return next(createError({status:404,message:'Wrong password'}))
        }

        const payload = {
            id:user._id,
            name:user.name
        }

        const token = jwt.sign(payload,process.env.JWT_SECRETE, {
            expiresIn:'1d'
        })

        return res.cookie('access_token',token, {
            httpOnly: true
        }).status(200)
        .json({'message':'Login Success'});
    }
    catch(error){
       next(error);
    }
}

export const logout = (req,res,next) => {
    res.clearCookie('access_token');
    return res.status(200).json({message:'Logout Success'});
}



export const isLoggedIn = (req,res,next) => {
    const token = req.cookies.access_token;
    
    if(!token){
        return res.json(false);
    }

    return jwt.verify(token, process.env.JWT_SECRETE,(err)=>{
        if(err){
            return res.json(false);
        }
        return res.json(true);
    })
}


