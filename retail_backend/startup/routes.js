const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('../routes/user');
const shippingInfo = require('../routes/shippingInfo');
const paymentInfo = require('../routes/paymentInfo');
const catalog = require('../routes/catalog');
const orderHistory = require('../routes/orderHistory');
const cartItem = require('../routes/cartItem');
const login = require('../routes/login');

module.exports = function(app) {
	app.use(express.json());
	app.use(bodyParser.json());
	app.use(cors());
	
	app.use('/user', user);
	app.use('/shipping', shippingInfo);
	app.use('/payment', paymentInfo);
	app.use('/orders', orderHistory);
	app.use('/catalog', catalog);
	app.use('/cart', cartItem);
	app.use('/login', login)
}