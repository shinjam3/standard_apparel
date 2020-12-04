const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const PaymentSchema = new Schema({
	customerID: {
		type: Schema.ObjectId,
		required: true
	},
	cardHolder: {
		type: String,
		required: true
	},
	cardNumber: {
		type: String,
		required: true
	},
	cvc: {
		type: Number,
		required: true
	},
	expMonth: {
		type: String,
		required: true
	},
	expYear: {
		type: String,
		required: true
	}
}, {collection: 'paymentinfo'});

module.exports = PaymentInfo = mongoose.model('paymentinfo', PaymentSchema);