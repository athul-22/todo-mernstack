import mongoose from "mongoose";

const { Schema } = mongoose;

const completedTaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  // Other fields as needed
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("CompletedTask", completedTaskSchema);
