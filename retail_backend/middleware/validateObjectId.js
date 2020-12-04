const mongoose = require('mongoose');

module.exports = function(req, res, next) {
	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(404).send('Invalid ID.');
	
	// if the above param is not a valid objectid, it will send a 404 error
	// otherwise it pass control to the next middleware function which in the case
	// of routes, the next function is the route handler
	next();
}