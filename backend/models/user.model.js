const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    age:Number
})

const UserModel = mongoose.model("sers",userSchema)

module.exports = {
    UserModel
}