const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Email already exists" });
    }

    let cart = {};
    for (let i = 0; i < 100; i++) cart[i] = 0;

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
        date: req.body.date,
    });

    await user.save();
    const data = { user: { id: user.id } };
    const token = jwt.sign(data, "secret_ecom");

    res.json({ success: true, token });
};

exports.login = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const passMatch = req.body.password === user.password;
        if (passMatch) {
            const data = { user: { id: user.id } };
            const token = jwt.sign(data, "secret_ecom");
            res.json({ success: true, token });
        } else {
            res.status(400).json({ success: false, errors: "Invalid password" });
        }
    } else {
        res.json({ success: false, errors: "Wrong email address" });
    }
};

exports.addToCart = async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Add cart");
};

exports.removeFromCart = async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
        await User.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send("remove cart");
    }
};

exports.getCart = async (req, res) => {
    let userData = await User.findOne({ _id: req.user.id });
    res.send(userData.cartData);
};
