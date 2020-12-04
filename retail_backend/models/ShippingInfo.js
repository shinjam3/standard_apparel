const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const ShippingSchema = new Schema({
	customerID: {
		type: Schema.ObjectId,
		required: true
	},
	areaCode: {
		type: Number,
		requied: true
	},
	phoneNumber: {
		type: Number,
		requied: true
	},
	street: {
		type: String,
		requied: true
	},
	city: {
		type: String,
		requied: true
	},
	province: {
		type: String,
		requied: true
	},
	postalCode: {
		type: String,
		requied: true
	}
}, {collection: 'shippinginfo'});

module.exports = ShippingInfo = mongoose.model('shippinginfo', ShippingSchema);