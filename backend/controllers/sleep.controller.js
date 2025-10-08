import Sleep from '../models/sleep.model.js';


//create sleeprecord

export const createSleep = async(req,res)=>{
    try {
        const {hours,quality} = req.body;
        if(!hours){
            return res.status(400).json({message:"please enter the houres"})
        }
        const sleep = await Sleep.create({
            hours,
            quality,
            user:req.user.id
        })
        
        res.status(201).json(sleep)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
};

//get sleeplogs

export const getSleep = async(req,res)=>{
    try {
        const sleeplogs = await Sleep.find({user:req.user.id}).sort({createdAt:-1})
        res.status(200).json(sleeplogs)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}

//update sleeprecord

export const updateSleep = async(req,res)=>{
    try {
        const {id}=req.params
        const sleep = await Sleep.findByIdAndUpdate(id,req.body,{new:true})
        if(!sleep){
            return res.status(400).json({message:"sleep record not found"})
        }
        res.status(200).json(sleep,{message:"sleeprecord updated"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}

//delete sleeprecord

export const deleteSleeplogs = async(req,res)=>{
    try{
    const {id} = req.params;
    const sleep = await Sleep.findByIdAndDelete(id)
    if(!sleep){
        return res.status(400).json({message:"sleep record not found"})
    }
    res.status(200).json({message:"sleep record was deleted"})
}
catch(error){
    console.log(error)
    return res.status(500).json({message:error.message})
}
} 
