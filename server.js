const express = require("express");
const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));



// HTML calls
// "/" refers to our homepage that we're requesting. It should bring up our index.html file under the 'public' folder that we're given.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
// "/notes" refers to our second page entitled notes.html under the public folder that we're given.
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});



// gets notes saved and joins it in db.json
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

// posts new notes and joins it in db.json
app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes));
    res.json(newNote);
});

// delete any saved notes
app.delete("/api/notes/:id", (req, res) => {
    const deleteNote = req.params.id;
    notes.splice(deleteNote, 1);
    fs.writeFileSync(path.join(__dirname, "./db/db.json"), JSON.stringify(notes));
    res.json(deleteNote);
});

// Listen
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));