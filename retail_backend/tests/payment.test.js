const request = require('supertest');
const mongoose = require('mongoose');
const {User} = require('../models/User');
const PaymentInfo = require('../models/PaymentInfo');
const auth = require('../middleware/auth');

let server;
const token = new User().generateAuthToken();
let info;
const testInfo = {
	customerID: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c'),
	cardHolder: 'test name',
	cardNumber: '123456789012',
	cvc: 564,
	expMonth: '05',
	expYear: '99'
};

describe('/payment', () => {
	beforeEach(async () => {
		server = require('../index');
		
		// populate test payment info into db
		let testPayment = new PaymentInfo(testInfo);
		await testPayment.save();
	});
	
	afterEach(async () => {
		// removes test payment info from db
		await PaymentInfo.findOneAndRemove({ customerID: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c') });		
		await server.close();
	});
	
	
	// testing fetch of existing shipping info for logged in user
	describe('GET /payment/:id', () => {
		it("should match the user's payment info from the db with the test info", async () => {
			info = {
				cardHolder: 'test name',
				cardNumber: '123456789012',
				cvc: 564,
				expMonth: '05',
				expYear: '99'
			};
			
			let result = await request(server).get('/payment/5fc1821bcfa3332088feef6c').set('x-auth-token', token);
			expect(result.body[0]).toEqual(
				expect.objectContaining(info)
			);
		});
	});
	
	
	// testing payment info update for logged in user
	describe('PUT /payment/update-payment/:id', () => {
		it("should match the user's updated payment info from the db with the test info", async () => {
			info = {
				cardHolder: 'new name',
				cardNumber: '987654321091',
				cvc: 876,
				expMonth: '05',
				expYear: '01'
			};
			
			await request(server).put('/payment/update-payment/5fc1821bcfa3332088feef6c').set('x-auth-token', token).send(info);
			let result = await PaymentInfo.find({ customerID: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c') });
			
			expect(result[0]).toEqual(
				expect.objectContaining(info)
			);
		});
	});
});