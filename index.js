import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import crudRoutes from './routes/crudRoutes.js'
import { redisClient } from './config/redis.js'


const app = express()
app.use(express.json())
app.get('/',(req,res)=>res.send('Hey server is working'))
app.use('/api',crudRoutes)



const PORT =process.env.PORT|| 4000
app.listen(PORT,()=>console.log(`server is running at ${PORT}`))