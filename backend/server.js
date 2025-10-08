import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import ConnectDB from './config/dbs.js'
import userRoute from './routes/user.route.js'
import exerciseRoute from './routes/exercise.route.js'
import dietRoute from './routes/diet.route.js'
import waterRoute from './routes/water.route.js'
import sleepRoute from './routes/sleep.route.js'
import weightRoute from './routes/weight.route.js'
import dashboardRoute from './routes/dashboard.route.js'
import monthlyRoute from './routes/monthlyReport.route.js'


const app = express();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());
app.use(cors());

//Db connection 
ConnectDB();



// app.get('/',(req,res)=>{
//     res.send("api is running....")
// })

//routes

app.use('/api/users',userRoute)
app.use('/api/exercise',exerciseRoute)
app.use('/api/diet',dietRoute)
app.use('/api/water',waterRoute)
app.use('/api/sleep',sleepRoute)
app.use('/api/weight',weightRoute)
app.use('/api/dashboard',dashboardRoute)
app.use('/api/monthly',monthlyRoute)


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})