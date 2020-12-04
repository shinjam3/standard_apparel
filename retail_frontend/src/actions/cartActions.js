/*
- Each action creater is a function that we need to export
- When the fetchPosts action is called, what it's doing is
	fetching and dispatching the type and payload to the reducer.
	What the reducer then does is returning the state with the new
	items that were fetched. So now we have to back to the component(s) 
	and we have to get the new items from the reducer state. The way we 
	do that is by using a function called mapStateToProps, so we can get 
	the state from redux and map it to properties of the component and we can 
	use that inside of our component(s)
*/

import {FETCH_CART, ADD_TO_CART, DELETE_CART_ITEM, CLEAR_CART} from '../actions/types';

// fetches online shopping cart of logged in user and saves it to the store
export function fetchCart(orderNum) {
	return function(dispatch) {
		fetch(`http://localhost:5000/cart/${orderNum}`, {
			headers: {
				'x-auth-token': localStorage.getItem('token')
			}
		})
		.then(res => res.json())
		.then(cartItems => dispatch({
			type: FETCH_CART,
			payload: cartItems
		}));
	}
}

// adds catalog item to online shopping cart in store and db
export function addToCart(loginInfo, item) {
	return function(dispatch) {
		let obj = Object.assign({});
		obj.customerID = loginInfo._id;
		obj.orderNum = loginInfo.orderNum;
		obj.title = item.title;
		obj.price = item.price;
		obj.imgsrc = item.imgsrc;
		obj.quantity = item.quantity;
		
		fetch('http://localhost:5000/cart', {
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"x-auth-token": localStorage.getItem('token')
			},
			method: 'POST',
			body: JSON.stringify(obj)
		})
		.then(res => res.json())
		.then( () => dispatch({
			type: ADD_TO_CART,
			payload: obj
		}));
	}
}

export function deleteCartItem(itemID) {
	return function(dispatch) {
		fetch(`http://localhost:5000/cart/${itemID}`, {
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"x-auth-token": localStorage.getItem('token')
			},
			method: 'DELETE'
		})
		.then(res => res.json());
		
		dispatch({
			type: DELETE_CART_ITEM,
			payload: itemID
		});
	}
}

export function clearCart() {
	return function(dispatch) {
		dispatch({
			type: CLEAR_CART,
			payload: []
		})
	}
}