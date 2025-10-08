import mongoose from "mongoose";
const dietschema =  new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",

    },
    foodtype:{
        type:String,
        required:true,
    },
    calories:{
        type:Number,
        required:true,

    },
    fats:{
        type:Number,
        default:0,
    },
    protein:{
        type:String,
        default:0,
    },
    carbs:{
        type:String,
        default:0,
    },
    date:{
        type:Date,
        default:Date.now,
    }
,},{timestamps:true})

const Diet = mongoose.model("Diet",dietschema)
export default Diet;