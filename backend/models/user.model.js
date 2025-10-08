import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"]
        
    },
    lastname:{
        type:String,
        required:[true,"please enter your last name"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"please enter your email"]
    
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        default:0,
        
    },
    weight:{
        type:Number,
        default:0,
        
    },
    height:{
        type : Number,
        default:0
    },
    gender:{
        type:String,
        enum:["male","female","other",]

    }
    
    
},{timestamps:true})
const User = mongoose.model("User",userschema)
export default User;