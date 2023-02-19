const express = require("express")
const jwt = require("jsonwebtoken")
const {UserModel} =  require("../models/user.model")
const bcrypt = require('bcrypt');


const userRoute = express.Router()

userRoute.get("/", async(req,res)=>{
    try{
        const a = await UserModel.find()
        res.send(a)
    }catch(err){
        res.send(err.message)
    }
})

userRoute.post("/register", async(req,res)=>{
    const {email,pass} = req.body;
    const user = req.body;
    const exist = await UserModel.find({email})
    console.log(exist)
    if (exist.length>0) res.send("<h1>User already exist</h1> <h1>Please Login</h1>")
    else {
        bcrypt.hash(pass, 4, async function(err, hash) {
            if (err){
                console.log(err.message)
            }
            else{
                user.pass = hash
                const data = new UserModel(user)
                await data.save()
                res.send("Successfully Registered")
            }
        });
    }
})

userRoute.post("/login",async(req,res)=>{
    try{
        const {email,pass} = req.body;
        const user = await UserModel.find({email})
        if (user.length>0){
            // const token = jwt.sign({userID:user[0]._id,name:user[0].name},"shhh")
            // res.send({"msg":"Login Successful","token":token})
            bcrypt.compare(pass, user[0].pass, function(err, result) {
                // In the below line if password match then result will become true
                if (result) {
                    // The payload which we parovide while generating the token is use
                    // If I put userID on payload then the ID will be available for every crud operation
                    const token = jwt.sign({userID:user[0]._id,name:user[0].name},"shhh")
                    console.log('Login Success')
                    res.send({"msg":"Login Successful","token":token})
                }
                // In the below line if user entered a wrong pass then this will throw an error
                else {
                    res.send(err)
                }
            });
        }
        else {
            res.send("Please Login")
        }
    }catch(err){
        res.send({"msg":"Something Wrong","err":err})
    }
})


module.exports = {userRoute}