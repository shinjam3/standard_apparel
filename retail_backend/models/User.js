const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

// Create schema
const UserSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50
	},
	lastName: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 200,
		unique: true
	},
	pass: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 1024
	},
	orderNum: {
		type: Number,
		required: true
	}
}, {collection: 'user'});


// generate an authentication token with JSON web token
UserSchema.methods.generateAuthToken = function() { 
	const token = jwt.sign({
		_id: this._id, 
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		orderNum: this.orderNum
	}, config.get('jwtPrivateKey'));
	return token;
}

// requirement validation
function validateUser(user) {
	const schema = Joi.object({
		firstName: Joi.string().min(2).max(50).required(),
		lastName: Joi.string().min(2).max(50).required(),
		email: Joi.string().min(5).max(200).required().email(),
		pass: Joi.string().min(8).max(200).required(),
		orderNum: Joi.number().required()
	});

	return schema.validate(user);
}

module.exports.User = User = mongoose.model('user', UserSchema);
module.exports.validate = validateUser;