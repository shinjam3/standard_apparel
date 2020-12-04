const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const CartItem = require('../models/CartItem');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');


// fetch shopping cart items for specific order number
router.get('/:id', auth, (req, res) => {	
	CartItem.find({ orderNum: req.params.id })
	.then(cartItems => res.json(cartItems))
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


// insert new cart item into database
router.post('/', auth, (req, res) => {	
	const newCartItem = new CartItem({
		customerID: mongoose.Types.ObjectId(req.body.customerID),
		title: req.body.title,
		price: req.body.price,
		quantity: req.body.quantity,
		imgsrc: req.body.imgsrc,
		orderNum: req.body.orderNum
	});
	
	newCartItem.save()
	.then(cartItem => res.json(cartItem))
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


// deletes specific cart item in database
router.delete('/:id' , [auth, validateObjectId], (req, res) => {
	CartItem.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) }, function(err, docs){
		if (err) throw err;
	})
	.then(() => res.json({Success: true}))
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


module.exports = router; 