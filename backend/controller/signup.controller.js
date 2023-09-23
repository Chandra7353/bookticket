let Users =require("../models/signup.models")
const bcryptjs = require("bcryptjs")
const JWT = require('jsonwebtoken')



let signupuser = async (req,res,next)=>{
    try{
        let {name, email, password}= req.body;
        let isUser = await Users.findOne({email})
        console.log(isUser);
        if(!isUser){
            let createUser = await Users.create({name, email, password})
            return res.status(200).json({error:false, message:"Account created sucessfully", data:{name:createUser.name, email:createUser.email}})
        }
        return res.status(404).json({ error: true, message: "User already exists" })
    }
    catch(err){
        next(err)
    }
}

let Userlogin = async (req, res, next)=>{

    try{
        let {email, password}=req.body
    
        let useravailable = await Users.findOne({email});
    
        if(!useravailable){
            return res.status(404).json({error:true, message:"No studnet found with the given email id"})
        }
    
    
        let handlepassword = await useravailable.compareMypassword(password)
    
    
        if(handlepassword){
    
    
            //! JWT token generating 
            let token = JWT.sign({email:useravailable.email,name:useravailable.name},process.env.JWT_KEY,{expiresIn:process.env.JWT_EXPIRESIN})
    
            return res.status(201).json({error:false, message:"Login sucessfully",data:token,useravailable})
    
        }
     

        else{
            return res.status(404).json({error:true, message:"Invallid password"})
        }
    
    }
    catch(err){
        next(err)
    }
    
    }


let Passwordreset = async (req, res, next)=>{
    try{
        let {email,password} = req.body;

        let isuserAvailable = await Users.findOne({email});

        if(!isuserAvailable){
            return res.status(404).json({error:true, message:`user detail not found with email id ${email}`})
        }
        let salt = await bcryptjs.genSalt(10); //length of encrypted password
        let hashedPassword = await bcryptjs.hash(password, salt);
        let updateduser = await Users.findOneAndUpdate({email}, {password:hashedPassword}, {new:true})
        console.log()
        return res.status(200).json({error:false, message:`Password updated successfully`, data:{email,name:updateduser.name}})
        
    }
    catch(err){
        next(err);
    }
}

let updateProfile = async(req,res,next)=>{
    try{

        let {name,email,image}=req.body;

        let update = await Users.findOne({email})

        if(!update){
            return res.status(400).json({error:true,message:"No data found given email"})
        }
        let port = `http://localhost:${process.env.PORT}`

        // let path=req.file.path.replace("public","");
        let path = req.file.path.split("public")[1];
        let imagePath = port + path
        console.log(imagePath)

        let updateddata = await Users.findOneAndUpdate({email},{name,image:imagePath},{new:true})
        return res.status(200).json({error:false,message:"data updated sucessfully", data:updateddata})

    }
    catch(err){
        next(err)
    }
}

let bookbusticket = async(req,res,next)=>{
    try{
        let {email,bookticket}=req.body;

        let bookbus = await Users.findOne({email})

        if(!bookbus){
            return res.status(400).json({error:true, message:"no email found given email"})
        }
       
        let addticket = await Users.findOneAndUpdate({email},{$push:{bookticket:bookticket}},{new:true})
       console.log(addticket);
        return res.status(200).json({error:false, message:"task added sucessfully", data:addticket})

    }
    catch(err){
        next(err)
            }
} 

module.exports = {
    signupuser,
    Userlogin,
    Passwordreset,
    bookbusticket,
    updateProfile
    
}