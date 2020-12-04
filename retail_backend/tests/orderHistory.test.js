const request = require('supertest');
const mongoose = require('mongoose');
const {User} = require('../models/User');
const OrderHistory = require('../models/OrderHistory');
const auth = require('../middleware/auth');

let server;

describe('/orders', () => {
	beforeEach(() => server = require('../index'));
	
	afterEach(async () => {
		// removes test order history document after each test
		await OrderHistory.findOneAndRemove({ customerID: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c') });
		await server.close();
	});
	
	it("should match the user's order history from the db with the test info", async () => {
		let token = new User().generateAuthToken();
		let testOrderInfo = {
			customerID: '5fc1821bcfa3332088feef6c',
			orderNum: 93239
		};
		
		await request(server)
		.post('/orders')
		.set('x-auth-token', token)
		.send(testOrderInfo);
		
		let result = await OrderHistory.find({ customerID: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c') });
		expect(result[0]).toHaveProperty('customerID', mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c'));
		expect(result[0]).toHaveProperty('orderNum', 93239);
	});
});