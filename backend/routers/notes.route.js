const express = require("express");
const {NoteModel} = require("../models/note.model")

const noteRouter = express.Router()

noteRouter.get("/", async(req,res)=>{
    try{
        let notes = await NoteModel.find()
        // let arr = []
        // for (let i=0;i<notes.length;i++){
        //     if (notes[i].author!=undefined){
        //         arr.push(notes[i].author)
        //     }
        // }
        // let newSet = new Set(arr)
        // let arr2 = []
        // for (let x in newSet){
        //     console.log(x)
        // }
        res.send({"msg":"Here is your notes","notes":notes})
    }catch(err){
        res.send(err)
    }
})

noteRouter.post("/create", async(req,res)=>{
    try{
        const note = req.body;
        const newNote = new NoteModel(req.body)
        await newNote.save()
        res.send({"msg":"Note added", "note":note})
    }catch(err){
        res.send(err.messagewc)
    }
})

noteRouter.delete("/delete",(req,res)=>{
    res.send("Note Deleted")
})

module.exports = {
    noteRouter
}