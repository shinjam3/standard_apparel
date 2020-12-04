const request = require('supertest');
const mongoose = require('mongoose');
const {User} = require('../models/User');

let server;
let testUser = {};

describe('POST /login', () => {
	beforeEach(async () => {
		server = require('../index');
		
		// populate database with test user for login tests
		const loginTestUser = {
			firstName: "loginTest",
			lastName: "loginTest",
			email: "logintest@gmail.com",
			pass: "Testing1!",
			orderNum: 123456
		};
		await request(server).post('/user/register').send(loginTestUser);
	});
	
	
	afterEach(async () => {
		// removes test user after each test
		await User.findOneAndRemove({ email: "logintest@gmail.com" });
		await server.close();
	});
	
	
	// test 1
	it("should return a 400 status if the submitted email is not in the db", async () => {
		testUser = {
			email: 'abc@fake.com',
			pass: 'Qwerty1!'
		};
		
		let res = await request(server).post('/login').send(testUser);
		expect(res.status).toBe(400);
	});
	
	
	// test 2
	it('should return a 400 status if the email exists in the db but the password is not correct', async () => {
		testUser = {
			email: 'logintest@gmail.com',
			pass: 'Incorrect1!'
		};
		
		let res = await request(server).post('/login').send(testUser);
		expect(res.status).toBe(400);
	});
	
	
	// test 3
	it('should return a 200 status if the sign in information is correct and the response should have an x-auth-token header', async () => {
		testUser = {
			email: 'logintest@gmail.com',
			pass: 'Testing1!'
		};
		
		let res = await request(server).post('/login').send(testUser);

		expect(res.status).toBe(200);
		expect(res.header).toHaveProperty('x-auth-token');
	});
});