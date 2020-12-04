const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const OrderSchema = new Schema({
	customerID: {
		type: Schema.ObjectId,
		required: true
	},
	orderNum: {
		type: Number,
		requied: true
	},
	orderDate: {
		type: Date,
		default: Date.now
	}
}, {collection: 'orderhistory'});

module.exports = OrderHistory = mongoose.model('orderhistory', OrderSchema);