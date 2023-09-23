const express =require("express");
const { signupuser, bookbusticket, Passwordreset, Userlogin, updateProfile } = require("../controller/signup.controller");
const multer =require("multer")

let routes = express.Router();

const mystorage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        cb(null, './public/uploads')
      },
      filename: function (req, file, cb) {
        
        cb(null, file.originalname)
      }
})

const upload = multer({storage: mystorage})

routes.post("/signup", signupuser)
routes.post("/loginuser", Userlogin)
routes.put("/bookbus", bookbusticket)
routes.put("/resetpass", Passwordreset)
routes.put("/updateprofile",upload.single("image") ,updateProfile)


module.exports =routes