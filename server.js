const express = require('express');

const app = express();

// Allows Express to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
    // TODO: Return notes.html
});

app.get('/api/notes', (req, res) => {
    // TODO: Return all saved notes
});

app.post('/api/notes', (req, res) => {
    // TODO: Save a new note
});

app.delete('/api/notes/:id', (req, res) => {
    // TODO: Delete the note with ID `id`
});

// Fallback route thing
// NB: This should always be the last route
app.get('*', (req, res) => {
    // TODO: Return index.html
});