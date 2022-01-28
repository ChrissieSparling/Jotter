const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const notes = require('./routes/notes');
app.use('/notes',notes);

const api = require('./routes/api');
app.use('/api/notes',api);

app.listen( PORT, () =>{
    console.log('listening to port: '+ PORT);
})