const express = require("express")
const cors = require("cors")
const app = express();
const {connection} = require("./config/db")
const {userRoute} = require("./routers/user.router")
const {noteRouter} = require("./routers/notes.route")
const {authenticate} = require("./middlewares/authenticate.middleware")

app.use(express.json())
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hi there")
})

app.use("/user", userRoute)
app.use(authenticate)
app.use("/notes", noteRouter)



app.listen(5000, async(err)=>{
    try{
        await connection;
        console.log("Server is running at 5000")
    }catch(err){
        console.log(err)
    }
})