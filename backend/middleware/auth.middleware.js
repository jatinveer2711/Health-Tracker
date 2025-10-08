import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRETKEY

 export const verifyToken = async (req,res,next)=>{
    
      const authHeader = req.headers.authorization;
      if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message:"Access denied "})
      }
      const token =  req.headers.authorization.split(" ")[1];
      if(!token){
        return res.status(401).json({message:"Aeccess denied, no token provided"})
      }
      try{
         const decoded = jwt.verify(token,JWT_SECRET);
         req.user = {id:decoded.id};
         next();
         
      }
      catch(error){
        console.log(error);
        return res.status(403).json({message:"token is not valid"})
      }

    
}