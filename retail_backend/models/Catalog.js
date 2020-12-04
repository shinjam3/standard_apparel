const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const CatalogSchema = new Schema({
	itemID: {
		type: Number,
		required: true
	},
	category: {
		type: String,
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
	imgsrc: {
		type: String,
		required: true
	},
	newProduct: {
		type: Boolean,
		required: true
	},
	section: {
		type: String,
		required: true
	}
}, {collection: 'catalog'});

module.exports = Catalog = mongoose.model('catalog', CatalogSchema);