import mongoose from "mongoose";
const sleepschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    hours:{
        type:Number,
        required:true,

    },
    quality:{
         type:String,
         enum:["good","average","poor"],
         default:"average"
    },
    date:{
        type:Date,
        default:Date.now
    }
,},{timestamps:true})

const Sleep = mongoose.model("sleep",sleepschema);
export default Sleep;