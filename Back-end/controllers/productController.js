const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
    let products = await Product.find({});
    let id = products.length > 0 ? products.slice(-1)[0].id + 1 : 1;

    const product = new Product({
        id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        date: req.body.date,
        available: req.body.available,
    });

    await product.save();
    res.json({ success: true, name: req.body.name });
};

exports.deleteProduct = async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name });
};

exports.getAllProducts = async (req, res) => {
    let products = await Product.find({});
    res.send(products);
};

exports.getNewCollection = async (req, res) => {
    let products = await Product.find({});
    let newCollection = products.slice(-6);
    res.send(newCollection);
};

exports.getPopularProducts = async (req, res) => {
    let products = await Product.find({ category: "Men" });
    let popular = products.slice(-6);
    res.send(popular);
};
