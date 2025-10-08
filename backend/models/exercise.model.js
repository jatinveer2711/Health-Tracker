import mongoose from "mongoose";
const  exerciseschema =  new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    type:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true,

    },
    caloriesBurned:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        
        default:Date.now,
    }

},{timestamps:true})
const Exercise = mongoose.model("Exercise",exerciseschema);
export default Exercise;