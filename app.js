const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3005;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });


app.use(express.static('public'));

app.post('/api/movies', upload.single('image'), (req, res) => {
    const { name, description } = req.body;
    const imagePath = req.file.path;

    const movie = { id: Date.now(), name, image: imagePath, description };
    movies.push(movie);
    res.json({ success: true });
});

app.get('/api/movies', (req, res) => {
    res.json({ movies });
});

const movies = [];

app.listen(port, () => {
    console.log(`Listening to the port http://localhost:${port}`);
});
