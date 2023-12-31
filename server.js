const express= require("express")
const app=express()
const mongoose=require("mongoose")
var cors = require('cors')
const Registration=require("./models/registrationModel")
require('dotenv').config()

const PORT=process.env.PORT
const MONGO_URL=process.env.MONGO_URL
const FRONT_END=process.env.FRONT_END

app.use(express.json())

var corsOptions = {
    origin: FRONT_END,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))

app.get("/all",async (req,res)=>{
    try{
        const allRegistries=await Registration.find({})
        // console.log(allRegistries)
        res.status(200).json(allRegistries)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
})

// app.post("/login",async(req,res)=>{
//     try{

//         const existingUserData = await Registration.find({})

//         let userExist = false

//         existingUserData.filter((each)=>{
//             if (each.username === req.body.username && each.password === req.body.password){
//                 userExist = true
//                 res.status(200).json({message: "You logged in successfully"})
//             }
//             else if (each.username === req.body.username && each.password !== req.body. password){
//                 userExist = true
//                 res.status(200).json({message: "Incorrect password"})
//             }
//             else if (each.username !== req.body.username && each.password === req.body. password){
//                 userExist = true
//                 res.status(200).json({message: "Incorrect username"})
//             }
//         })

//         if(!userExist){
//             res.status(200).json({message: "Please register before login"})

//         }



//     }catch(error){
//         res.status(404).json({message:error.message})
//     }

// }
// )



app.post("/login",async (req,res)=>{
    try{
      
       const findData=await Registration.find({})
       let userExists=false
       findData.filter((each)=>{
        if (each.username === req.body.username && each.password === req.body.password)
        {
                userExists=true
                res.status(200).json("Success")
                console.log("user logged in successfully")
            }
        else if (each.username === req.body.username && each.password !== req.body.password)
        {
            userExists=true
            res.status(401).json({message: "password incorrect"})
            console.log("password incorrect")
        }
        else if (each.username !== req.body.username && each.password === req.body.password)
        {
            userExists=true
            res.status(401).json({message: "incorrect username"})
            console.log("username incorrect")
        }     
    })

        if(!userExists)
        {
            res.status(404).json({message: "user does not exists, please register"})
        }
    }catch(err){
        
        res.status(404).json({message:err.message})
        console.log(err)
    }
})

app.delete('/delete/:id',async (req,res)=>{
    try{
        const {id}=req.params
        const deletedRegistry=await Registration.findByIdAndDelete(id)
        console.log(deletedRegistry)
        res.status(200).json(deletedRegistry)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
})

app.post('/signup',async (req,res)=>{
    try{

        const completeData=await Registration.find({})
        completeData.filter((each)=>{
            if(each.username===req.body.username && each.email===req.body.email){
                throw new Error("user already registered, Please login")
            }     
            })
            const registration=await Registration.create(req.body)
            res.status(200).json("Success")
    }
    catch(err){
        // console.log(err)
        res.status(500).json({message:err.message})
    }
})



mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("Mongo db is connected")
    app.listen(PORT,()=>{
        console.log(`app is running on port ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})

