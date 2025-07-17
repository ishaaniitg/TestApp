import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import Student from './models/StudentModel.js';
import bcrypt from 'bcrypt'
import middleWare from './Middleware.js';

import dotenv from 'dotenv' // install .env packGE AND IMPORT it 
dotenv.config() // for env variables to work in this file


const app = express()
const port = process.env.PORT || 3000 // either port from ENV or 3000 

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:5173' , 'https://test-57mg65bih-ishaans-projects-50e969d3.vercel.app/'], // frontend port
  credentials: true
})) // built middleware

mongoose.connect(process.env.MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/login' , async (req,res)=>{
    try{
        const {email , password } = req.body;
        const stud = await Student.findOne({email})
        if(!stud){
            res.status(404).json({success:false, msg : 'User not found !'})
        } else {
            const compare = await bcrypt.compare(password , stud.password)    // compare hashed password with entered password       
            if(!compare){
                res.status(404).json({success:false , msg : 'password did not match'})
            } 

             const token = jwt.sign({id : stud._id} , process.env.JWT_SECRET_KEY , {expiresIn:'1m'} ) // sending initial Token , with (1) payload : unique ID , (2) : Security Key , (3) : session Expires in 
            res.status(200).json({success:true , token , stud}) // send token to front end on successfull login in
        }
    } catch(err) {
      res.status(500).json({success:false , msg : 'server-error'})
    }
})

app.post('/register' , async (req,res) =>{
  try {
    const {name , email , password} = req.body
    const hashPass = await bcrypt.hash( password , 10)
     const newStud = new Student({name ,email ,  password : hashPass})

     await newStud.save()
     res.status(200).json({success :  true , newStud})
  } catch {
    res.status(500).json({success:false})
  }
})


app.get('/dashboard', middleWare , (req,res)=>{
  return res.json({success: true , message : 'Authorized'})
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
