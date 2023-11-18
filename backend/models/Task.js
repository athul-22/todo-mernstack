import mongoose from "mongoose";

const {Schema} = mongoose;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type:Boolean,
        required: false,
        default:false,
    },
    priority: {
        type: String,
        required: false,
    },
    datetime : {
        type: String,
        required: false,
    },
    datenew : {
        type: String,
        required: false,
    },
    timenew : {
        type: String,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
}, {timestamps:true});

export default mongoose.model("Task",taskSchema);
//model name , schema name