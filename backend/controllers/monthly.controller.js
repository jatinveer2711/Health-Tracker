import mongoose from 'mongoose'
import Diet from '../models/diet.model.js'
import Exercise from '../models/exercise.model.js'
import Sleep from '../models/sleep.model.js'
import Water from '../models/water.model.js'
import Weight from '../models/weight.model.js'
// import User from '../models/user.model.js'

export const monthlyReport = async(req,res)=>{
    try {
        const userID  = req.user.id
        const today = new Date();
        const firstDaymonth = new Date(today.getFullYear(),today.getMonth(),1)
        
 // exercise monnthly report 

 const exerciseMOnthlyreport = await Exercise.aggregate([
  {
    $match: {
      user: new mongoose.Types.ObjectId(userID),
      createdAt: { $gte: firstDaymonth, $lte: today },
    }
  },
  {
    $group: {
      _id: {$dayOfMonth:"$createdAt"} ,
      totalExercise: { $sum: "$duration" },
      
    }
  },
]);
const monthlyTotal = exerciseMOnthlyreport.reduce((acc,item)=>acc+item.totalExercise,0)
const totalDayMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
const averageMonth = (monthlyTotal/totalDayMonth).toFixed(1)



          
         
        //diet monthly report 

    const caloriesMonthlyreport = await Diet.aggregate([
           {
    $match: {
      user: new mongoose.Types.ObjectId(userID),
      createdAt: { $gte: firstDaymonth, $lte: today }
    }
  },
  {
    $group: {
      _id: { $dayOfMonth: "$createdAt" },
      totalCalories: { $sum: "$calories" }
    }
  }
]);
const caloriesMonthTotal = caloriesMonthlyreport.reduce((c,item)=>c+item.totalCalories,0)
const totalDayMonthCalories = new Date(today.getFullYear(),today.getMonth() + 1,0).getDate();
const averageCalories = (caloriesMonthTotal/totalDayMonthCalories).toFixed(1)

        // Sleep monthly report 

        const sleepReport = await Sleep.aggregate([{
            $match:{user:new mongoose.Types.ObjectId(userID),
            createdAt:{$gte:firstDaymonth , $lte:today}
            }
        },{
            $group:{_id:{$dayOfMonth:"$createdAt"},
            totalSleep:{$sum:"$hours"}}
            }])

        const sleepMonthTotal = sleepReport.reduce((s,item)=>s+item.totalSleep,0)
        const totalDayMonthSleep = new Date(today.getFullYear(),today.getMonth()+1,0).getDate();
        const averageSleep = (sleepMonthTotal/totalDayMonthSleep).toFixed(1)



        // water monthly report 
        
        const waterReport = await Water.aggregate([{
            $match:{user:new mongoose.Types.ObjectId(userID),
            createdAt:{$gte:firstDaymonth , $lte:today}
            } 
        },{
            $group:{
                _id:{$dayOfMonth:"$createdAt"},
                totalWater:{$sum:"$amount"}
            }
        }])
        const waterTotalMonthly = waterReport.reduce((w,item)=>w+item.totalWater,0)
        const totalDayMonthWater = new Date(today.getFullYear(),today.getMonth()+1,0).getDate()
        const averageWater = (waterTotalMonthly/totalDayMonthWater).toFixed(1)




        // weigh monthly report

        const weightMontlyReport  = await Weight.aggregate([{
            $match:{user:new mongoose.Types.ObjectId(userID),
            createdAt:{$gte:firstDaymonth,$lte:today}
            }
        },{
            $group:{
                _id:{$dayOfMonth:"$createdAt"},
                weight:{$avg:"$weight"}
            },
            $group:{
              _id:null,
              averageweight:{$avg:"$weight"}
            }
        }])
        const monthlyAvgWeight = weightMontlyReport.length > 0 ? weightMontlyReport[0].averageweight.toFixed(1) : 0;

        

        // date of month
        const daysInMonth = Array.from({length:today.getDate()},(_,i)=>i+1);


        const reportMonthly = daysInMonth.map((day)=>{
        const foundCalories= caloriesMonthlyreport.find((item)=>item._id==day);
        const foundExercise = exerciseMOnthlyreport.find((item)=>item._id==day);
        const foundSleep = sleepReport.find((item)=>item._id==day);
        const foundWater = waterReport.find((item)=>item._id == day);
        const foundWeight = weightMontlyReport.find((item)=>item._id ==day)


        return{
        date:day,
        calories:foundCalories?.totalCalories || 0,
        weight:foundWeight?.weight || 0 ,
        exercise:foundExercise?.totalExercise || 0 ,
        water:foundWater?.totalWater ||0 ,
        sleep:foundSleep?.totalSleep || 0 ,

    };
    });
    res.status(200).json(
        {reportMonthly,
          averageMonth,
          averageCalories,
          averageSleep,
          averageWater,
          monthlyAvgWeight,
        }
    )

    
   
    } catch (error) {
         console.error(error)
         res.status(500).json({message:error.message})
    }

}
