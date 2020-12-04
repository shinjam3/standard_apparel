const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const PaymentInfo = require('../models/PaymentInfo');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');


// updates existing user payment information
router.put('/update-payment/:id', [auth, validateObjectId], (req, res) => {
	let query = {customerID: mongoose.Types.ObjectId(req.params.id)},
    update = {
		cardHolder: req.body.cardHolder,
		cardNumber: req.body.cardNumber,
		cvc: req.body.cvc,
		expMonth: req.body.expMonth,
		expYear: req.body.expYear
	},
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
	
	PaymentInfo.findOneAndUpdate(query, update, options, function(err, res) {
		if (err) throw err;
	})
	.then(() => res.end())
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


// fetches existing payment information for logged in user
router.get('/:id', [auth, validateObjectId], (req, res) => {
	PaymentInfo.find({ customerID: mongoose.Types.ObjectId(req.params.id)})
	.then(info => res.send(info))
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


module.exports = router; 