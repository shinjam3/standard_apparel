const request = require('supertest');
const mongoose = require('mongoose');
const {User} = require('../models/User');
const CartItem = require('../models/CartItem');

let server;
const token = new User().generateAuthToken();

describe('/cart', () => {
	beforeEach(async () => {
		server = require('../index');
		
		// test item for test 2
		const testItemOne = new CartItem(
			{
				customerID: '5fc1821bcfa3332088feef6c',
				orderNum: 36752,
				title: 'T-Shirt',
				price: 9.99,
				imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmentop1.jpg',
				quantity: 2
			}
		);
		// test item for test 3
		const testItemTwo = new CartItem(
			{
				customerID: '5fc1821bcfa3332088feef6c',
				orderNum: 36752,
				title: 'Test T-Shirt',
				price: 9.99,
				imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmentop1.jpg',
				quantity: 2
			}
		);
		// populate database with test items
		await CartItem.collection.insertMany([testItemOne, testItemTwo]);	
	});
	
	afterEach(async () => {
		// removes test items from db
		await CartItem.deleteMany({ orderNum: { $in: [36752] } });
		await server.close();
	});
	
	
	// test 1
	// fetching cart for specific order number
	describe('GET /cart', () => {
		it("should return an array of cart items of length 2 order number 36752", async () => {	
			let result = await request(server)
			.get('/cart/36752')
			.set('x-auth-token', token);
			
			expect(result.body.length).toBe(2);
		});
	})
	
	
	// test 2
	// adding cart item to db for specific order number
	describe('POST /cart', () => {
		it('should match the cart item from db with the test cart item', async () => {
			let item = {
				customerID: '5fc1821bcfa3332088feef6c',
				orderNum: 36752,
				title: 'T-Shirt',
				price: 9.99,
				imgsrc: 'https://raw.githubusercontent.com/shinjam3/retailphotos/master/unsplashmentop1.jpg',
				quantity: 2
			};
			
			let result = await request(server)
			.post('/cart')
			.set('x-auth-token', token)
			.send(item);
			
			expect(result.body).toEqual(
				expect.objectContaining(item)
			);
		})
	});

	
	// test 3
	// deleting a specific cart item from db
	describe('DELETE /cart', () => {
		it("should have a response status of 200 and {Success: true} object", async () => {	
			let res = await request(server)
			.delete('/cart/5fc1821bcfa3332088feef6c')
			.set('x-auth-token', token);
			
			expect(res.status).toBe(200);
			expect(res.body).toEqual({Success: true});
		});
	});
});