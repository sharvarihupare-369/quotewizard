const express = require("express")
const cors = require("cors")
const quoteRouter = require("./routes/quoteRouter")
const userRouter = require("./routes/userRoutes")
const  connection    = require("./db");
require("dotenv").config()
const app = express()

app.use(cors())
app.use(express.json())
app.use("/users",userRouter)
app.use("/generate",quoteRouter)

app.get("/",(req,res)=>{
    res.send("Welcome to Home Route!")
})

app.listen(process.env.PORT || 5000 , async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is listening on Port ${process.env.PORT}`)
})