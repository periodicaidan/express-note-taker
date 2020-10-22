const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require('util');

const PORT = process.env.PORT || 3900;
const DB_PATH = 'db/db.json';

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const app = express();

// Allows Express to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    fs.readFile(DB_PATH, 'utf-8', (err, data) => {
        if (err) {
            res.statusCode = 500;
            return res.send('Server error, sorry for the inconvenience!');
        }

        return res.json(JSON.parse(data));
    });
});

app.post('/api/notes', async (req, res) => {
    const db = usingDb(db => {
        db.push(req.body);
        console.log(`Added Note: "${req.body.title}"`);
    });

    return res.json(db);
});

app.delete('/api/notes/:id', async (req, res) => {
    const db = usingDb(db => {
        const [ deleted ] = db.splice(req.params.id, 1);
        console.log(`Deleted note: "${deleted.title}"`);
    });

    return res.json(db);
});

// Fallback route thing
// NB: This should always be the last route
app.get('*', (req, res) => {
    return res.sendFile('public/index.html');
});

app.listen(PORT);

async function usingDb(fn) {
    const db = JSON.parse(await readFileAsync(DB_PATH, 'utf-8'));
    fn(db);
    writeFileAsync(DB_PATH, JSON.stringify(db));
    return db;
}