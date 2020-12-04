const request = require('supertest');
const mongoose = require('mongoose');
const {User} = require('../models/User');
const ShippingInfo = require('../models/ShippingInfo');
const PaymentInfo = require('../models/PaymentInfo');
const auth = require('../middleware/auth');

let server;
const token = new User().generateAuthToken();

describe('/user', () => {
	beforeEach(async () => {
		server = require('../index');
		
		// test user for test 2
		const testUserOne = new User({
			firstName: 'existingEmailTest',
			lastName: 'existingEmailTest',
			email: 'emailtest@gmail.com',
			pass: 'Loremipsum1!',
			orderNum: 59899
		});
		// test user for test 4 and 5
		const testUserTwo = new User({ 
			_id: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c'),
			firstName: "firstname",
			lastName: "lastname",
			email: "resettest@gmail.com",
			pass: "Testing1!",
			orderNum: 38924,
		});
		// populate database with test users
		await User.collection.insertMany([testUserOne, testUserTwo]);	
	});
	
	
	afterEach(async () => {
		// remove test user from test 2
		await User.findOneAndRemove({ email: 'emailtest@gmail.com' });
		
		// remove test user from test 3
		await User.findOneAndRemove({ email: 'registertest@gmail.com' });
		
		// remove test user from test 4 and 5
		await User.findOneAndRemove({ _id: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c') });
		
		await server.close();
	});
	

	// registration testing
	describe('POST /register', () => {
		// test 1
		it('should return 400 status if the user info does not satisfy requirement(s)', async () => {
			const res = await request(server).post('/user/register').send(
				{
					firstName: 'a',
					lastName: 'b',
					email: 'qwerty',
					pass: 'qwerty',
					orderNum: 37395
				}
			);
			
			expect(res.status).toBe(400);
		});
		
		// test 2
		it('should return 400 status if the user submits an existing email', async () => {			
			const res = await request(server).post('/user/register').send(
				{
					firstName: 'John',
					lastName: 'Doe',
					email: 'emailtest@gmail.com',
					pass: 'Loremipsum1!',
					orderNum: 43879
				}
			);
						
			expect(res.status).toBe(400);
		});
		
		// test 3
		it('should get the registered user from the database if registration is successful', async () => {
			let user = {
				firstName: 'John',
				lastName: 'Doe',
				email: 'registertest@gmail.com',
				pass: 'Loremipsum1!',
				orderNum: 39439
			};
			
			await request(server).post('/user/register').send(user);
			const result = await User.find({ email: 'registertest@gmail.com' });			
			
			delete user.pass; 
			
			expect(result[0]).toEqual(
				expect.objectContaining(user)
			);
		});
	});
	
	
	/*
	clearing cart items after purchasing and providing new order number
	assuming the put request has a valid objetID and JWT
	*/
	describe('PUT /new-order-num/:id', () => {
		// test 4	
		it("should update order number to 93239 for the existing user with _id: 5fc1821bcfa3332088feef6c", async () => {			
			await request(server)
			.put(`/user/new-order-num/${'5fc1821bcfa3332088feef6c'}`)
			.set('x-auth-token', token)
			.send({ orderNum: 93239 });
			
			const result = await User.find({ _id: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c') });
			
			expect(result[0]).toEqual(
				expect.objectContaining({ orderNum: 93239 })
			);
		});
	});
	
	
	// updating existing user login information
	describe('PUT /update-profile/:id', () => {
		// test 5
		it('should update the user info for existing user with _id: 5fc1821bcfa3332088feef6c', async () => {
			let updatedUser = {
				firstName: 'newFirstname',
				lastName: 'newLastname',
				email: 'new@gmail.com',
				pass: 'newPass1!'
			};
			
			await request(server)
			.put(`/user/update-profile/${'5fc1821bcfa3332088feef6c'}`)
			.set('x-auth-token', token)
			.send(updatedUser);
		
			delete updatedUser.pass;
			const result = await User.find({ _id: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c') });
			await User.updateOne({_id: mongoose.Types.ObjectId('5fc1821bcfa3332088feef6c')}, {
				firstName: 'firstname',
				lastName: 'lastname',
				email: 'resettest@gmail.com',
				pass: 'Testing1!'
			});
			
			expect(result[0]).toEqual(
				expect.objectContaining(updatedUser)
			);
		});
	});	
	
	
	// deleting specific user from db
	describe ('DELETE /delete-user/:id', () => {
		// test 6
		it('should return empty arrays for finding the shipping, payment and user info for deleted user', async() => {
			// populate db with test information
			let testShippingInfo = new ShippingInfo({
				customerID: mongoose.Types.ObjectId('5fc955891181da8302e2e41f'),
				areaCode: 123,
				phoneNumber: 4567890,
				street: '1 Test Street',
				city: 'Toronto',
				province: 'Ontario',
				postalCode: 'X0X 0X0'
			});
			await testShippingInfo.save();

			let testPaymentInfo = new PaymentInfo({
				customerID: mongoose.Types.ObjectId('5fc955891181da8302e2e41f'),
				cardHolder: 'test name',
				cardNumber: '123456789012',
				cvc: 564,
				expMonth: '05',
				expYear: '99'
			});
			await testPaymentInfo.save();
			
			let testDeleteUser = new User({ 
					_id: mongoose.Types.ObjectId('5fc955891181da8302e2e41f'),
					firstName: "firstname",
					lastName: "lastname",
					email: "deletetest@gmail.com",
					pass: "Testing1!",
					orderNum: 40235,
			});
			await testDeleteUser.save();
			
			await request(server)
			.delete('/user/delete-user/5fc955891181da8302e2e41f')
			.set('x-auth-token', token);
			
			let userResult = await User.find({ _id: mongoose.Types.ObjectId('5fc955891181da8302e2e41f') });
			let shippingResult = await ShippingInfo.find({ customerID: mongoose.Types.ObjectId('5fc955891181da8302e2e41f') });
			let paymentResult = await PaymentInfo.find({ customerID: mongoose.Types.ObjectId('5fc955891181da8302e2e41f') });
			
			expect(userResult.length).toBe(0);
			expect(shippingResult.length).toBe(0);
			expect(paymentResult.length).toBe(0);
		});
	});
});