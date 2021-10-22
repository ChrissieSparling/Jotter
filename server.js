//const elements
const express = require("express");
const path = require("path");
const app = express();
const db = require("./db/db.json")
const generateUUId = require("unique-identifier")
const fs = require("fs")

//what port we are working at
const PORT = 3000;

app.use(express.static("public"))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

//these are the html routes (view routes)
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, `./public/index.html`))
})

app.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, `./public/notes.html`))
})

//these are our api routes (controller routes)
app.get("/api/notes/", (req, res)=>{
    res.sendFile(path.join(__dirname, `./db/db.json`))
})

app.delete("/api/notes/:id", (req,res)=>{
    console.log(req.params)
    const id = req.params.id
    const newList = db.filter(note=> note.id != id)
    console.log(newList)
    fs.writeFileSync("./db/db.json", JSON.stringify(newList,null,4))

    res.json({"notes": "deletes"})
})

app.post("/api/notes", (req, res)=>{
    console.log(req.body);
    uniqueVal = generateUUId()
    //new note is the (model) main)
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqueVal,
    }
    db.push(newNote)
    console.log(db)
    fs.writeFileSync("./db/db.json", JSON.stringify(db,null,4))
    res.send("I need to...")
})

app.listen( PORT, ()=>{
    console.log(`we're working at ${PORT}`)
})