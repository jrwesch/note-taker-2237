const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const db = require('./db/db.json');

// unique ID for all notes
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static('public'));

//POST - new note saved on request body and add to db.json
app.post('/api/notes', (req, res) => {
    
    const note = req.body;

    //give note a unique ID
    note.id = uuidv4();

    db.push(note);

    fs.writeFileSync('./db/db.json', JSON.stringify(db));

    res.json(db);
});

//Delete - remove note from db.json, show updated database
app.delete('/api/notes/:id', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json'));
    const newDb = db.filter((note) => {
        return note.id !== req.params.id;
    });

    fs.writeFileSync('./db/db.json', JSON.stringify(newDb));

    res.json(newDb);
});

// read the db.json file and return saved notes as JSON
app.get('/api/notes/', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dbData = JSON.parse(data);
        res.json(dbData)
    });
});

// Notes Route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Home Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Wildcard Rout
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


//Listen to this port
app.listen(PORT, () => 
    console.log(`App listening on ${PORT}`));
    