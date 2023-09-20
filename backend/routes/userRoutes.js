require("dotenv").config()
const express = require("express")
const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const  registerVal  = require("../middleware/registerVal")
const jwt = require("jsonwebtoken")
const BlackListModel = require("../models/blacklistModel")
const userRouter = express.Router()

userRouter.post("/register",registerVal,async(req,res)=>{
    const {password} = req.body;
    try {
        const hashPassword = await bcrypt.hash(password,10)
        const user = await UserModel.create({...req.body,password:hashPassword})
        res.status(200).send({msg:"User Registered Successfully!",user})
    } catch (error) {
        res.status(400).send({"errmsg":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
   
    try {
      
        const user = await UserModel.findOne({email})
        
        if(!user){
            return res.status(400).send({"errmsg":"Invalid Credentials"})
        }
        
        const hashedPassword = await bcrypt.compare(password,user.password)
    
        if(!hashedPassword){
           
          return  res.status(400).send({"errmsg":"Invalid Credentials"})
        }else{
           
            const token = jwt.sign({name:user.name,userId:user._id},process.env.secretKey,{expiresIn:"1d"})
            res.status(200).send({msg:"User LoggedIn Successfully!",token,username:user.name})
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).send({"errmsg":error.message})
    }
})

userRouter.get("/logout",async(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
       return res.status(400).send({"errmsg":"Login First"})
    }
    try {
     
            const logout = await BlackListModel.create({token})
            res.status(200).send({"msg":"User is Logged Out!"})
    
    } catch (error) {
        res.status(400).send({"errmsg":error.message})
    }
})

module.exports= userRouter