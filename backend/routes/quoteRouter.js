const express = require("express")
require("dotenv").config()
const quoteRouter = express.Router()
const OpenAI =  require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


quoteRouter.post("/jokes",async(req,res)=>{
   try {
    const {genre} = req.body
    const prompt = `Generate a funny joke about ${genre}`
    const chatCompletion = await openai.chat.completions.create({
        messages:  [{ role: "system", content: "You are a helpful assistant that generates jokes." }, { role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        temperature:0.7
    });
    // console.log(chatCompletion.choices[0].message.content)
    res.status(200).send(chatCompletion.choices[0].message.content)
   } catch (error) {
    res.status(400).send({errormsg:error.message})
   }
})

quoteRouter.post("/quote",async(req,res)=>{
    try {
     const {genre} = req.body
     const prompt = `Generate a meaningful  quote about ${genre}`
     const chatCompletion = await openai.chat.completions.create({
         messages:  [{ role: "system", content: "You are a helpful assistant that generates quotes." }, { role: "user", content: prompt }],
         model: "gpt-3.5-turbo",
         temperature:0.7
     });
    //  console.log(chatCompletion.choices[0].message.content)
     res.status(200).send(chatCompletion.choices[0].message.content)
    } catch (error) {
     res.status(400).send({errormsg:error.message})
    }
 })

 
quoteRouter.post("/stories",async(req,res)=>{
    try {
     const {genre} = req.body
     const prompt = `Write a story about ${genre}`
     const chatCompletion = await openai.chat.completions.create({
         messages:  [{ role: "system", content: "You are a helpful assistant that generates stories." }, { role: "user", content: prompt }],
         model: "gpt-3.5-turbo",
         temperature:0.7
     });
    //  console.log(chatCompletion.choices[0].message.content)
     res.status(200).send(chatCompletion.choices[0].message.content)
    } catch (error) {
     res.status(400).send({errormsg:error.message})
    }
 })

 quoteRouter.post("/shayaries",async(req,res)=>{
    try {
     const {genre,language} = req.body
     let lang;
     if (language === "english") {
        lang = "en"; // English
    } else {
        lang = "hi"; // Hindi
    }
     const prompt = `Compose a shayari about ${genre}`
     const chatCompletion = await openai.chat.completions.create({
         messages:  [{ role: "system", content: "You are a helpful assistant that generates shayari." },
          { role: "user", content: prompt }],
         model: "gpt-3.5-turbo",
         temperature:0.7,
         lang: lang
     });
    //  console.log(chatCompletion.choices[0].message.content)
     res.status(200).send(chatCompletion.choices[0].message.content)
    } catch (error) {
     res.status(400).send({errormsg:error.message})
    }
 })

 
quoteRouter.post("/songs",async(req,res)=>{
    try {
        const { genre } = req.body;
   
        const prompt = `Compose a song with a ${genre} theme.`
        const chatCompletion = await openai.chat.completions.create({
         messages:  [{ role: "system", content: `You are a helpful assistant that writes songs.` }, { role: "user", content: prompt }],
         model: "gpt-3.5-turbo",
         temperature:0.7
     });
    //  console.log(chatCompletion.choices[0].message.content)
     res.status(200).send(chatCompletion.choices[0].message.content)
    } catch (error) {
     res.status(400).send({errormsg:error.message})
    }
 })

module.exports = quoteRouter;