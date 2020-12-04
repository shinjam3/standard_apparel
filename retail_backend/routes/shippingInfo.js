const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ShippingInfo = require('../models/ShippingInfo');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');

// updates existing user shipping information
router.put('/update-shipping/:id', [auth, validateObjectId], (req, res) => {
	let query = {customerID: mongoose.Types.ObjectId(req.params.id)},
    update = {
		areaCode: req.body.areaCode,
		phoneNumber: req.body.phoneNumber,
		street: req.body.street,
		city: req.body.city,
		province: req.body.province,
		postalCode: req.body.postalCode
	},
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
	
	ShippingInfo.findOneAndUpdate(query, update, options, function(err, res) {
		if (err) throw err;
	})
	.then(() => res.end())
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


// fetches existing shipping information for logged in user
router.get('/:id', [auth, validateObjectId], (req, res) => {
	ShippingInfo.find({ customerID: mongoose.Types.ObjectId(req.params.id) })
	.then(info => res.send(info))
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


module.exports = router; 