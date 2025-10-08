import Diet from '../models/diet.model.js';

// create diet 

export const createDiet = async (req,res)=>{
    try {
        const {foodtype,calories,fats,protein,carbs} = req.body;
        if( !foodtype || calories==0){
            return res.status(400).json({message:"food and calories are required"})
        }
        const diet = await Diet.create({
            user:req.user.id,
            calories,
            foodtype,
            fats,
            protein,
            carbs,
            

        });
        return res.status(201).json(diet)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
};

//get 

export const getAlldiet = async(req,res)=>{
    try {
        const diet = await Diet.find({user:req.user.id}).sort({createdAt:-1})
        return res.status(200).json(diet)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
};

//update diet 
export const updateDiet = async (req,res)=>{
    try {
        const {id} = req.params;
        const diet = await Diet.findByIdAndUpdate(id, req.body,{new:true})
        if(!diet){
            return res.status(404).json({message:"Diet not found"})
        }
        return res.status(200).json(diet)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
};

// delete Diet

export const deleteDiet  = async(req,res)=>{
    try {
        const {id} = req.params
        const diet  = await Diet.findByIdAndDelete(id)
        if(!diet){
            return res.status(400).json("task was not found")
        }
        return res.status(200).json("Diet was deleted")
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}