import Task from '../models/Task.js'
import createError from '../utils/errors.js'
import CompletedTask from '../models/CompletedTask.js'

export const createTask = async (req, res, next) => {

  try {
    const newTask = new Task({
      title: req.body.title,
      completed: req.body.completed,
      priority: req.body.priority,
      datetime: req.body.datetime,
      datenew: req.body.formattedDate,
      timenew: req.body.formattedTime,
      user: req.user.id,
    })
    const savedTask = await newTask.save();
    return res.status(201).json(savedTask);
  }
  catch (err) {
    return next(err)
  }
}


export const getAllTask = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
}

export const currentUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    return res.status(200).json(tasks);
  }
  catch (err) {
    return next(err)
  }
}

// export const updateTask = async(req,res,next) => {
//     try{
//         const task = await Task.findById(req.params.taskId).exec();
//         if(!task){
//             return next(createError({status:404,message:"No task found"}));
//         }
//         if(task.user.toString() !== req.user.id){
//             return next(createError({status:401,message:"Task not associated with your profile"}));
//         }

//         const updateTask = await Task.findByIdAndUpdate(req.params.taskId, {
//             title:req.body.title,
//             completed: req.body.completed
//         },{
//             new:true
//         });
//         return res.status(200).json(updateTask);
//     }
//     catch(err){
//         return next(err);
//     }
// }

export const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId).exec();

    if (!task) {
      return next(createError({ status: 404, message: "No task found" }));
    }

    if (task.user.toString() !== req.user.id) {
      return next(createError({ status: 401, message: "Task not associated with your profile" }));
    }

    // Check if the task is completed
    if (req.body.completed) {
      // Move the task to completed tasks section
      const completedTask = new CompletedTask({
        title: task.title,
        user: req.user.id,
        // Copy other fields as needed
      });

      await completedTask.save();

      // Remove the task from the main tasks
      await Task.findByIdAndDelete(taskId);

      return res.status(200).json(completedTask);
    } else {
      // Update the task if it's not completed
      const updatedTask = await Task.findByIdAndUpdate(taskId, {
        title: req.body.title,
        completed: req.body.completed,
      }, {
        new: true,
      });

      return res.status(200).json(updatedTask);
    }
  } catch (err) {
    return next(err);
  }
};


// export const deleteTask = async(req,res,next) => {
//     try{
//         const task = await Task.findById(req.params.taskId).exec();
//         if(!task){
//             return next(createError({status:404,message:"No task found"}));
//         }
//         if(task.user.toString() !== req.user.id){
//             return next(createError({status:401,message:"Task not associated with your profile"}));
//         }
//         await Task.findByIdAndDelete(req.params.taskId);
//         return res.status(200).json('Task deleted successfully');
//     }catch(error){
//         return next(error)
//     }
// }

// 🌟 DELETE TASK FUNCTION
// export const deleteTask = async (req, res, next) => {
//     try {
//       const taskId = req.params.taskId;
//       const task = await Task.findById(taskId).exec();

//       if (!task) {
//         return next(createError({ status: 404, message: "No task found" }));
//       }

//       if (task.user.toString() !== req.user.id) {
//         return next(createError({ status: 401, message: "Task not associated with your profile" }));
//       }

//       // Move the task to completed tasks section
//       const completedTask = new CompletedTask({
//         title: task.title,
//         user: req.user.id,
//         // Copy other fields as needed
//       });

//       await completedTask.save();

//       // Remove the task from the main tasks
//       await Task.findByIdAndDelete(taskId);

//       return res.status(200).json('Task deleted successfully');
//     } catch (error) {
//       return next(error);
//     }
//   };

//DELETE TASK TO MOVE TO COMPLETED
//   export const moveToCompletedTasks = async (req, res, next) => {
//     try {
//       const taskId = req.params.taskId;
//       const task = await Task.findById(taskId).exec();

//       if (!task) {
//         return next(createError({ status: 404, message: "No task found" }));
//       }

//       if (task.user.toString() !== req.user.id) {
//         return next(createError({ status: 401, message: "Task not associated with your profile" }));
//       }

//       // Move the task to completed tasks section
//       const completedTask = new CompletedTask({
//         title: task.title,
//         user: req.user.id,
//         // Copy other fields as needed
//       });

//       await completedTask.save();

//       // Remove the task from the main tasks
//       await Task.findByIdAndDelete(taskId);

//       return res.status(200).json(completedTask);
//     } catch (error) {
//       return next(error);
//     }
//   };

// In your controllers file (e.g., tasksController.js)


export const moveToCompletedTasks = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId).exec();

    if (!task) {
      return next(createError({ status: 404, message: "No task found" }));
    }

    if (task.user.toString() !== req.user.id) {
      return next(createError({ status: 401, message: "Task not associated with your profile" }));
    }

    // Move the task to completed tasks section
    const completedTask = new CompletedTask({
      title: task.title,
      user: req.user.id,
      // Copy other fields as needed
    });

    await completedTask.save();

    // Remove the task from the main tasks
    await Task.findByIdAndDelete(taskId);

    return res.status(200).json(completedTask);
  } catch (error) {
    return next(error);
  }
};


export const getAllcompletedTask = async(req,res,next) => {
  try {
    const tasks = await CompletedTask.find({});
    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
}

export const userCompletedTask = async (req, res, next) =>{
  try {
    const tasks = await CompletedTask.find({ user: req.user.id });
    return res.status(200).json(tasks);
  }
  catch (err) {
    return next(err)
  }
}