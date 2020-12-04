const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const {User, validate} = require('../models/User');
const PaymentInfo = require('../models/PaymentInfo');
const ShippingInfo = require('../models/ShippingInfo');

const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

// password hasing 
const bcrypt = require('bcrypt');

const _ = require('lodash');
// todo: const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');


// insert new registered user information into database
router.post('/register', async (req, res) => {
	// verifies if submitted information meets requirements
	const { error } = validate(req.body); 
	if (error) return res.status(400).send(error.details[0].message);
	
	// verifies if a user with the submitted email already exists
	let result = await User.find({ email: req.body.email }).limit(1);
	if (result.length) {
		return res.status(400).send('User already registered.');
	}
	else {
		let user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'pass', 'orderNum']));
		
		// generates a salt (random encrypted string)
		// then bcrypt will encrypt the password with the salt included
		// then reset the user's password as the encrypted password
		const salt = await bcrypt.genSalt(10);
		user.pass = await bcrypt.hash(user.pass, salt);
		await user.save();
	}
	
	res.send('Success');
});


// clears shopping cart of specific user after an order has been made
// by giving the user a new order number
router.put('/new-order-num/:id', [auth, validateObjectId], (req, res) => {
	User.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {orderNum: req.body.orderNum})
	.then(() => res.send('Success'))
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


// updates existing user login information
router.put('/update-profile/:id', [auth, validateObjectId], async (req, res) => {
 	const salt = await bcrypt.genSalt(10);
	let newPass = await bcrypt.hash(req.body.pass, salt);
	 
	User.updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		pass: newPass
	})
	.then(() => res.send('Success'))
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


// deletes user with the specific _id
router.delete('/delete-user/:id', [auth, validateObjectId], async (req, res) => {
	try {
		await User.findOneAndRemove({ _id: mongoose.Types.ObjectId(req.params.id) })
		await PaymentInfo.findOneAndRemove({ customerID: mongoose.Types.ObjectId(req.params.id) })
		await ShippingInfo.findOneAndRemove({ customerID: mongoose.Types.ObjectId(req.params.id) })
		
		return res.send('Success');
	}
	catch (err) {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	}
});


module.exports = router; 