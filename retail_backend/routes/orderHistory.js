const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const OrderHistory = require('../models/OrderHistory');
const auth = require('../middleware/auth');


// adds new purchased order into database
router.post('/', auth, (req, res) => {
	const newOrder = new OrderHistory({
		customerID: mongoose.Types.ObjectId(req.body.customerID),
		orderNum: req.body.orderNum
	});
	
	newOrder.save()
	.then(order => res.json(order))
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


module.exports = router; 