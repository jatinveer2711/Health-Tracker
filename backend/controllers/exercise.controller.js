import Exercise from '../models/exercise.model.js'

// create exersice 
export const createExercide = async (req,res)=>{
    try {
        const {type,duration,caloriesBurned}=req.body;
        if(!type || duration==0 || caloriesBurned==0){
            return res.status(400).json({message:"All fields are required"})
        }
        const exercise = await Exercise.create({
            user:req.user.id,
            type,
            duration,
            caloriesBurned,
        })
        return res.status(201).json(exercise)
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error.message})
    }
}

// fetch all exercise

export const getAllExercise = async(req,res)=>{
    try {
        const exercise = await Exercise.find({user:req.user.id}).sort({createdAt:-1});
        res.status(200).json(exercise)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}


//update exercise 

export const updateExersice = async(req,res)=>{
    try {
        const {id}=req.params
        const exercise = await Exercise.findByIdAndUpdate(id,req.body,{new:true})
        if(!exercise){
            return res.status(404).json({message:"Exercise not found"})
        }
       return res.status(200).json(exercise,"Exercise was updated")
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}


// delete exercise 
export const deleteExercise  = async(req,res)=>{
    try {
        const {id} = req.params
        const exercise = await Exercise.findByIdAndDelete(id)
        if(!exercise) {
            return res.status(404).json({message:"Exercise not found"})
        }
        res.status(200).json({message:"Exercise was deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}