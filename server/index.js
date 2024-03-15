import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Register } from './models/register.models.js';
const app = express();

app.use(cors());

app.use(express.json());
const port = 3001
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost:27017/mern' )

app.post('/register', (req,res ) =>{
    const{ fname,lname,email,password }= req.body;
    Register.findOne({email: email})
    .then(user =>{
        if(user){
            res.status(400).json({message: 'User already exists'})
        }
        else{
            const newUser = new Register({
                fname,
                lname,
                email,
                password
            })
            newUser.save()
          .then(user =>{
                res.status(201).json({message: 'User created successfully'})
            })
          .catch(err =>{
                res.status(500).json({message: 'Internal server error'})
            })
        }
    })
})
  
app.get('data', (req, res) =>{

})
app.listen(port , () =>{
    console.log(`Server is running on port ${port}`)
});