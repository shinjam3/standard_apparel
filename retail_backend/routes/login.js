const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/User');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// login route handler
router.post('/', async (req, res) => {	
	let result;
	let user;
	
	result = await User.find({ email: req.body.email });
	if (!result.length)	return res.status(400).send('Invalid email or password.');	
	user = result[0];	
	
	const validPassword = await bcrypt.compare(req.body.pass, user.pass);
	if (!validPassword) return res.status(400).send('Invalid email or password.');

	const token = user.generateAuthToken();
	res.header('x-auth-token', token)
	.header('access-control-expose-headers', 'x-auth-token')
	.end();
});

module.exports = router;