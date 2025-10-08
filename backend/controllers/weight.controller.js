import Weight from '../models/weight.model.js'

//create record 

export const createWeight = async(req,res)=>{
    try {
        const {weight} = req.body;
        if(!weight){
            return res.status(400).json({message:"please provide weight"})
        }
        const weighrecord = await Weight.create({user:req.user.id,
            weight,
        })
         return res.status(200).json({weighrecord,message:"weight recored was created"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
};


//get

 export const getWeight = async(req,res)=>{
    try{
    const weighrecord = await Weight.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(weighrecord)
    }catch(error){
        console.log(error)
        return res.status(500).json({message:error.message})
    }
};


// update 

export const updateWeight = async(req,res)=>{
    try{
    const {id} = req.params;
    const weighrecord = await Weight.findByIdAndUpdate(id,req.body,{new:true})
    if(!weighrecord){
        return res.status({message:"no record was found"})
    }
    res.status(200).json(weighrecord)
}
catch(error){
    console.log(error)
    return res.status(500).json({message:error.message})
}
};

//delete
export const deleteWeight = async(req,res)=>{
    try {
        const {id} = req.params
        const weighrecord = await Weight.findByIdAndDelete(id)
        if(!weighrecord){
            return res.status(400).json({message:"no weight found"})
        }
        return res.status(200).json({message:"wieght record was deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}