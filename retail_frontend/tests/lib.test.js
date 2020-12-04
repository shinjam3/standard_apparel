const lib = require('./lib');

describe('calculateTotals', () => {
	it('should return sub-total: 119.97 and total: 135.57', () => {
		const lst = [
			{
				price: 19.99,
				quantity: 2
			},
			{
				price: 79.99,
				quantity: 1
			}
		];
		
		const result = lib.calculateTotals(lst);
		
		expect(result[0]).toBe(119.97);
		expect(result[1]).toBe(135.57);
	});	
	
	
	it('should return sub-total: 599.97 and total: 677.97', () => {
		const lst = [
			{
				price: 199.99,
				quantity: 2
			},
			{
				price: 199.99,
				quantity: 1
			}
		];
		
		const result = lib.calculateTotals(lst);
		
		expect(result[0]).toBe(599.97);
		expect(result[1]).toBe(677.97);
	});	
	
	
	it('should return sub-total: 79.99 and total: 90.39', () => {
		const lst = [
			{
				price: 19.99,
				quantity: 0
			},
			{
				price: 79.99,
				quantity: 1
			}
		];
		
		const result = lib.calculateTotals(lst);
		
		expect(result[0]).toBe(79.99);
		expect(result[1]).toBe(90.39);
	});
	
});