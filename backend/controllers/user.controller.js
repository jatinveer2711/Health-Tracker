import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
dotenv.config();

//generate token

const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRETKEY,{
        expiresIn:"7d"
    })
}

//signup user 

export const signup = async (req, res) => {
  try {
    const { name, lastname, email, password, age, weight, gender, height } = req.body;

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "user already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
      name,
      lastname,
      email,
      password: hashPassword,
      age,
      weight,
      height,
      gender,
    });
    

    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



// login user 

 export const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        //check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        //check password 
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"invalid password"})
        }
        res.status(200).json({message:"login success",token:generateToken(user._id),user:{_id:user._id,name:user.name,email:user.email},})

    }
    catch(error){
      console.log(error)
        res.status(500).json({message:"server error"})
    }
}

//logout user 

 export const logout = async(req,res)=>{
    try{
        res.status(200).json({message:"logout success"})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}