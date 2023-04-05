const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const dbData = require('./db/db.json');

// unique ID for all notes
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));


// Notes Route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(_dirname, './public/notes.html'));
});

// Home Route
app.get('/', (req, res) => {
    res.sendFile(path.join(_dirname, './public/index.html'));
});

// Wildcard Rout
app.get('*', (req,res) => {
    res.sendFile(path.join(_dirname, './public/index.html'));
});


//Listen to this port
app.listen(PORT, () => 
    console.log(`App listening on ${PORT}`));
    