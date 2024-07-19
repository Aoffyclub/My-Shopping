const port = 3000
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { error } = require('console');
const { types } = require('util');


app.use(express.json());
app.use(cors());

// database connection

mongoose.connect('mongodb+srv://aoffy:zaq123@cluster0.c5nzbue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')



app.get('/', (req, res) => {
    res.send("Express is running" + port)
})

// image storage
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }

}

)

const upload = multer({ storage: storage })


app.use("/images", express.static('./upload/images'))

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})


// Schema create

const Product = mongoose.model("Product", {

    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true
    },


})
//  create API  for adding products
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id
    if (products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0];
        id = last_product.id + 1
    } else {
        id = 1
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        date: req.body.date,
        available: req.body.available
    });
    console.log(product);
    await product.save();
    res.json({
        success: true,
        name: req.body.name,

    })


})

// API delete product
app.post('/deleteproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id })
    console.log("remove product");
    res.json({
        success: true,
        name: req.body.name,
    })
})

app.get('/allproducts', async (req, res) => {
    let products = await Product.find({})
    console.log("Fetch all products");
    res.send(products)

})

// Create  last product
app.get('/newcollection', async (req, res) => {

    let products = await Product.find({})
    let newcollection = products.slice(1).slice(-6)
    res.send(newcollection)

})

// Create  popular product
app.get('/popularproducts', async (req, res) => {

    let products = await Product.find({ category: "Men" })
    let popular = products.slice(1).slice(-6)
    res.send(popular)

})



// middle ware

const fetchUser = (req, res, next) => {
    const token = req.header('auth_token')
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' })
    } else {

        try {
            const data = jwt.verify(token, "secret_ecom")
            req.user = data.user
            next()
        } catch (error) {
            return res.status(401).json({ error: 'Token is not valid' })
        }
    }
}

// create cart product data
app.post('/addtocart', fetchUser, async (req, res) => {

    console.log(req.body.itemId, req.user.id);

    let userData = await User.findOne({ _id: req.user.id })
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Add cart")

})

app.post('/removefromcart', fetchUser, async (req, res) => {

    console.log(req.body.itemId, req.user.id);

    let userData = await User.findOne({ _id: req.user.id })

    if (userData.cartData[req.body.itemId] > 0) {

        userData.cartData[req.body.itemId] -= 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("remove cart")
    }

})

// create a get cart
app.get('/getcart', fetchUser , async (req, res) => {

    console.log("get cart");
    let userData = await User.findOne({ _id: req.user.id })
    res.send(userData.cartData)
})



// Schema for user models
const User = mongoose.model("User", {
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,

    },
    date: {
        type: Date,
        default: Date.now
    },
})

// Create User model for registration

app.post('/signup', async (req, res) => {

    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            errors: "Email already exists"
        })
    }

    let cart = {}

    for (let i = 0; i < 100; i++) {
        cart[i] = 0
    }

    const user = new User({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
        date: req.body.date
    });
    console.log(user);
    await user.save();

    const data = {
        user: {
            id: user.id,
        }
    }

    const token = jwt.sign(data, "secret_ecom");

    res.json({
        success: true,
        token
    })
})

app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email })

    if (user) {
        const passMatch = req.body.password === user.password
        if (passMatch) {
            const data = {
                user: {
                    id: user.id,
                }
            }
            const token = jwt.sign(data, "secret_ecom");
            res.json({
                success: true,
                token
            })
        } else {
            res.status(400).json({
                success: false,
                errors: "Invalid password"
            })

        }

    } else {
        res.json({
            success: false,
            errors: "Wrong email address"
        })
    }
})



app.listen(port, (error) => {
    if (!error) {
        console.log("server is running on port " + port);
    } else {
        console.log("server is not running on port " + port + error);
    }
})