import mongoose  from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

 const ConnectDB = async ()=>{
    
     try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
    process.exit(1); // process ko band kar dega agar DB connect na ho
  }
};
      

export default ConnectDB;