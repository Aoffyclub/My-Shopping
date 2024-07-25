const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const fetchUser = require('../middleware/fetchUser');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/addtocart', fetchUser, userController.addToCart);
router.post('/removefromcart', fetchUser, userController.removeFromCart);
router.get('/getcart', fetchUser, userController.getCart);

module.exports = router;
