import mongoose from "mongoose";
const weightschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    weight:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,

    }
},{timestamps:true})

const Weight = mongoose.model("Weight",weightschema)
export default Weight;