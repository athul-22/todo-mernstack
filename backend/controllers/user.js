import User from "../models/User.js"

export const getUserInfo = async(req,res,next) => {
    try{
        const data = await User.findById(req.user.id).select('name email task');
        return res.status(200).json(data);
    }
    catch(error){
        console.log(error);
    }
}

export const updateUserInfo = async(req,res,next) => {
    try{
        const updateUser = await User.findByIdAndUpdate(req.user.id, {
            name: req.body.name,
            email: req.body.email,
            verified:req.body.verified
        },{
            new:true
        }).select('name email');
        return res.status(200).json(updateUser);
    }
    catch(error){
        return next(error);
    }
}
