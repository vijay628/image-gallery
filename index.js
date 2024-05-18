var express = require('express');
var app = express();
const db = require('./db.js');
const cors = require('cors');
var bodyParser = require('body-parser');
var imgSchema = require('./model.js');
var fs = require('fs');
var path = require('path');
app.set("view engine", "ejs");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/images', async (req, res) => {
    try {
        const data = await imgSchema.find({});
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving images.");
    }
});

app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        var obj = {
            name: req.body.name,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(path.join(__dirname, '/uploads/', req.file.filename)),
                contentType: req.file.mimetype,
                path: '/uploads/' + req.file.filename 
            }
        };

        const item = await imgSchema.create(obj);
        item.save();
        res.status(201).send(obj);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving image.");
    }
});

var port = process.env.PORT || 5000;
app.listen(port, err => {
    if (err) {
        throw err;
    }
    console.log('Server listening on port', port);
});
