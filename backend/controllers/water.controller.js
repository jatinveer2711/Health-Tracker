import Water from '../models/water.model.js';

//create water intake

export const createWaterintake = async(req,res)=>{
    try {
        const {amount} = req.body;
        if(!amount){
            return res.status(400).json({message:"please enter amount"})
        }
        const water = await Water.create({
            amount,
            user:req.user.id,
        })
        res.status(201).json(water,{message:"water intake is created"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
};


//get water intake

export const getWaterintake = async(req,res)=>{
    try {
        const water = await Water.find({user:req.user.id}).sort({createdAt:-1});
        res.status(200).json(water)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
};


//update water intake 

export const updateWaterintake = async(req,res)=>{
    try {
        const {id}= req.params
        const water = await Water.findByIdAndUpdate(id,req.body,{new:true})
        if(!water){
            return res.status(400).json({message:"water intake not found"})
        }
        return res.status(200).json(water)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}

//delete water intake 
export const deleteWaterintake = async(req,res)=>{
    try {
        const {id} = req.params
        const water = await Water.findByIdAndDelete(id)
        if(!water){
            return res.status(404).json({message:"water intake not found"})
        }
        return res.status(200).json({message:"water intake was deleted"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}