const request = require('supertest');
const mongoose = require('mongoose');
const {User} = require('../models/User');
const ShippingInfo = require('../models/ShippingInfo');
const auth = require('../middleware/auth');

let server;
const token = new User().generateAuthToken();
let info;
const testInfo = {
	customerID: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c'),
	areaCode: 123,
	phoneNumber: 4567890,
	street: '1 Test Street',
	city: 'Toronto',
	province: 'Ontario',
	postalCode: 'X0X 0X0'
};

describe('/shipping', () => {
	beforeEach(async () => {
		server = require('../index');
		
		// populate test shipping info into db
		let testShipping = new ShippingInfo(testInfo);
		await testShipping.save();
	});

	afterEach(async () => {
		// removes test shipping info from db
		await ShippingInfo.findOneAndRemove({ customerID: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c') });		
		await server.close();
	});
	
	
	// testing fetch of existing shipping info for logged in user
	describe('GET /shipping/:id', () => {
		it("should match the user's shipping info from the db with the test info", async () => {
 			info = {
				areaCode: 123,
				phoneNumber: 4567890,
				street: '1 Test Street',
				city: 'Toronto',
				province: 'Ontario',
				postalCode: 'X0X 0X0'
			};
			
			let result = await request(server).get('/shipping/5fc1821bcfa3332088feef6c').set('x-auth-token', token);
			expect(result.body[0]).toEqual(
				expect.objectContaining(info)
			);
		});
	});
	
	
	// testing shpping info update for logged in user
	describe('PUT /shipping/update-shipping/:id', () => {
		it("should match the user's updated payment info from the db with the test info", async () => {
			info = {
				areaCode: 111,
				phoneNumber: 1111111,
				street: '1 Fake Street',
				city: 'Vancouver',
				province: 'British Columbia',
				postalCode: 'Q1Q 1Q1'
			};
			
			await request(server).put('/shipping/update-shipping/5fc1821bcfa3332088feef6c').set('x-auth-token', token).send(info);
			let result = await ShippingInfo.find({ customerID: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c') });
			
			expect(result[0]).toEqual(
				expect.objectContaining(info)
			);
		});
	});
});