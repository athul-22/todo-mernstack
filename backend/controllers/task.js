import Task from '../models/Task.js'
import createError from '../utils/errors.js'

export const createTask = async(req,res,next) => {

    try{
        const newTask = new Task({
            title:req.body.title,
            completed:req.body.completed,
            priority:req.body.priority,
            user:req.user.id,
        })
        const savedTask = await newTask.save();
        return res.status(201).json(savedTask);
    }
    catch(err){
       return next(err)
    }
}


export const getAllTask = async(req,res,next) => {
    try{
        const tasks = await Task.find({});
        return res.status(200).json(tasks);
    }catch(err){
    return next(err);
    }
}

export const currentUserTasks = async(req,res,next) => {
    try{
        const tasks = await Task.find({user: req.user.id});
        return res.status(200).json(tasks);
    }
    catch(err){
        return next(err)
    }
}

export const updateTask = async(req,res,next) => {
    try{
        const task = await Task.findById(req.params.taskId).exec();
        if(!task){
            return next(createError({status:404,message:"No task found"}));
        }
        if(task.user.toString() !== req.user.id){
            return next(createError({status:401,message:"Task not associated with your profile"}));
        }

        const updateTask = await Task.findByIdAndUpdate(req.params.taskId, {
            title:req.body.title,
            completed: req.body.completed
        },{
            new:true
        });
        return res.status(200).json(updateTask);
    }
    catch(err){
        return next(err);
    }
}

export const deleteTask = async(req,res,next) => {
    try{
        const task = await Task.findById(req.params.taskId).exec();
        if(!task){
            return next(createError({status:404,message:"No task found"}));
        }
        if(task.user.toString() !== req.user.id){
            return next(createError({status:401,message:"Task not associated with your profile"}));
        }
        await Task.findByIdAndDelete(req.params.taskId);
        return res.status(200).json('Task deleted successfully');
    }catch(error){
        return next(error)
    }
}