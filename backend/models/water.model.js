import mongoose from "mongoose";
const waterschema = new mongoose.Schema ({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    amount:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
},{timestamps:true})

const Water = mongoose.model("water",waterschema);
export default Water;