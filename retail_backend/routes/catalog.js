const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Catalog = require('../models/Catalog');


// fetch women's catalog in database
router.get('/women', (req, res) => {
	Catalog.find({ section: 'women' })
	.then(items => res.json(items))
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


// fetch men's catalog in database
router.get('/men', (req, res) => {
	Catalog.find({ section: 'men' })
	.then(items => res.json(items))
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


// fetch kids' catalog in database
router.get('/kids', (req, res) => {
	Catalog.find({ section: 'kids' })
	.then(items => res.json(items))
	.catch(err => {
		console.error(`Error: ${err}`);
		return res.status(500).json(err);
	});
});


module.exports = router;