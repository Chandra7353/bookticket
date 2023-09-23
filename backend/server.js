const express=require("express")
require("dotenv").config();
require('./config/DBconnection.js')
const cors =require("cors")

let userrouter=require("./router/signup.routes.js")


let app =express()
app.use(express.json())
app.use(cors())
app.use(express.static('./public'))

app.use("/api/bus", userrouter)


app.use("*", (req, res, next)=>{
    res.status(404).json("Page n found")
 })


 app.use((err,req, res, next)=>{
    res.status(400).json({error:true, message:err.message,data:"error data !!!!!!!!!!!!!"})
 })

app.listen(process.env.PORT, ()=>{
    console.log(`server running sucessfully ${process.env.PORT}`);
} )