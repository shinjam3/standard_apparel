const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const CartSchema = new Schema({
	customerID: {
		type: Schema.ObjectId,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	imgsrc: {
		type: String,
		required: true
	},
	orderNum: {
		type: Number,
		required: true
	}
}, {collection: 'cartitems'});

module.exports = CartItem = mongoose.model('cartitem', CartSchema);