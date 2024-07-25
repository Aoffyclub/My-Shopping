const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect('mongodb+srv://aoffy:zaq123@cluster0.c5nzbue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Image storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

app.use("/images", express.static('./upload/images'));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
});

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use(productRoutes);
app.use(userRoutes);

app.get('/', (req, res) => {
    res.send("Express is running on port " + port);
});

app.listen(port, (error) => {
    if (!error) {
        console.log("server is running on port " + port);
    } else {
        console.log("server is not running on port " + port + error);
    }
});
