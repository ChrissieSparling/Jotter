const api = require('express').Router();
// const path = require('path');
const fs = require('fs');

const notesDb = require('../db/db.json');
api.get('/', (req,res) => {
    res.json(notesDb);
});

api.post('/', (req,res) => {
    notesDb.push(req.body);
    fs.writeFileSync('./db/db.json',JSON.stringify(notesDb,null,4));
    res.json({message:'post handled'});
});

api.delete('/:id', (req,res) => {
    for (let i = 0; i < notesDb.length; i++) {
        if(notesDb[i].id==req.params.id){
            notesDb.splice(i,1);
        }   
    }
    res.status(404).send("nothing here.")
});
module.exports = api;