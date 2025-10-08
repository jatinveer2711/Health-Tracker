import mongoose from 'mongoose'
import Diet from '../models/diet.model.js'
import Exercise from '../models/exercise.model.js'
import Sleep from '../models/sleep.model.js'
import Water from '../models/water.model.js'
import Weight from '../models/weight.model.js'
import User from '../models/user.model.js'


export const getDashboard = async (req,res)=>{
    try {
        const userId = req.user.id

        // fetch user
        const user  = await User.findById(userId).select("height weight")


        const startDay = new Date();
        startDay.setHours(0,0,0,0);

        const endDay = new Date();
        endDay.setHours(23,59,59,999);

        // exercise  total minutes

        const exercises = await Exercise.find({
            user:userId,
            date:{$gte:startDay,$lte:endDay}
        });
        const totalExercises = exercises.reduce((sum,e)=> sum + e.duration,0)

        //diet total calories
       const diets = await Diet.find({
        user:userId,
        date:{$gte:startDay,$lte:endDay}
       });
       const totalCalories = diets.reduce((sum,d)=>sum + d.calories,0)

       // water amount
       const waters = await Water.find({
        user:userId,
        date:{$gte:startDay , $lte:endDay}
       });
       const totalWaterintake = waters.reduce((sum,w)=>sum + w.amount,0)

    //  total  sleep houres

    const sleeps = await Sleep.find({
        user:userId,
        date:{$gte:startDay,$lte:endDay}
    })
    const totalSleephours = sleeps.reduce((sum,s)=>sum + s.hours,0)


    // Latest Weight 

    const latesWeight = await Weight.findOne({
        user:userId,
    }).sort({date:-1})

    //Weekly status

    const today = new Date();
    const last7days = new Date()
    last7days.setDate(today.getDate() - 6);

    // diet week history

    const caloriesHistory = await Diet.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          createdAt: { $gte: last7days, $lte: today },
        },
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          calories: { $sum: "$calories" },
        },
      },
      
    
    ]);

    //Water week history

    const waterHistory = await Water.aggregate([
        {
            $match:{
                user: new mongoose.Types.ObjectId(userId),
                createdAt:{$gte:last7days ,$lte:today}
            },
        },
        {
            $group:{
                _id:{ $dayOfWeek: "$createdAt"},
                water:{$sum:"$amount"}
            }
        },
        
    ])

    //weight week history

     const weightHistory = await Weight.aggregate([
        {
            $match:{
                user: new mongoose.Types.ObjectId(userId),
                createdAt:{$gte:last7days ,$lte:today}
            },
        },
        {
            $group:{
                _id:{ $dayOfWeek: "$createdAt"},
                weight:{$avg:"$weight"}
            }
        },
        
        
    ]);

    //sleep wwek history


     const sleepHistory = await Sleep.aggregate([
        {
            $match:{
                user: new mongoose.Types.ObjectId(userId),
                createdAt:{$gte:last7days ,$lte:today}
            },
        },
        {
            $group:{
                _id:{ $dayOfWeek: "$createdAt"},
                sleep:{$sum:"$hours"}
            }
        },
        
    ]);


    //exercise week history


     const exerciseHistory = await Exercise.aggregate([
        {
            $match:{
                user: new mongoose.Types.ObjectId(userId),
                createdAt:{$gte:last7days ,$lte:today}
            },
        },
        {
            $group:{
                _id:{ $dayOfWeek: "$createdAt"},
                exercise:{$sum:"$duration"}
            }
        },
    ])
    
   const days = ["", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weeklyHistory = days.map((day, index) => {
  // We don't use the first element, so we can start our logic from index 1
  if (index === 0) return null;

  const foundCalories = caloriesHistory.find((item) => item._id === index);
  const foundWater = waterHistory.find((item) => item._id === index);
  const foundWeight = weightHistory.find((item) => item._id === index);
  const foundSleep = sleepHistory.find((item) => item._id === index);
  const foundExercise = exerciseHistory.find((item) => item._id === index);

  return {
    date: day,
    calories: foundCalories?.calories || 0,
    water: foundWater?.water || 0,
    weight: foundWeight?.weight || 0,
    sleep: foundSleep?.sleep || 0,
    exercise: foundExercise?.exercise || 0,
  };
}).filter(Boolean); // Filter out the null from the first element
    
     return res.status(200).json({
        totalExercises,
        totalCalories,
        totalSleephours,
        totalWaterintake,
        latesWeight:latesWeight ? latesWeight.weight:null,
        weeklyHistory,
        height: user.height,
        weight : user.weight,
    }) }catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}
