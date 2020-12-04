/* 
mock function from CartSummary.js in the "components" folder
calculates sub-total and total of user's online shopping cart
*/
module.exports.calculateTotals = function(cartItems) {
	let x = 0;
	let subT = 0;
	let total = 0;
	let i;
	let lst = cartItems;
	
	for (i=0; i<lst.length; i++) {
		x += parseFloat(((lst[i].price)*(lst[i].quantity)).toFixed(2));
	}
	
	subT = parseFloat(x.toFixed(2));
	total = parseFloat(((subT*0.13)+subT).toFixed(2));
	return [subT, total];
}