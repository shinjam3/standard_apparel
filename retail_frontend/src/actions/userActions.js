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

import {
	SAVE_USER,
	FETCH_SHIPPING,
	FETCH_PAYMENT,
	SAVE_EMPTY_SHIPPING,
	SAVE_EMPTY_PAYMENT,
	CONFIRM_LOGGED_IN,
	UPDATE_SHIPPING,
	UPDATE_PAYMENT,
	UPDATE_LOGIN,
	NEW_ORDER_NUM,
	SIGN_OUT
} from '../actions/types';

// fetches login information to verify existing login info
export function saveUser(loginInfo) {
	return function(dispatch) {
		dispatch({
			type: SAVE_USER,
			payload: loginInfo
		});
	}
}

// fetches shipping info of user
export function fetchShipping(userID) {
	return function(dispatch) {
		fetch(`http://localhost:5000/shipping/${userID}`, {
			headers: { "x-auth-token": localStorage.getItem('token') }
		})
		.then(res => res.json())
		.then(data => dispatch({
			type: FETCH_SHIPPING,
			payload: data[0]
		}));
	}
}

// fetches payment info of user
export function fetchPayment(userID) {
	return function(dispatch) {
		fetch(`http://localhost:5000/payment/${userID}`, {
			headers: { "x-auth-token": localStorage.getItem('token') }
		})
		.then(res => res.json())
		.then(data => dispatch({
			type: FETCH_PAYMENT,
			payload: data[0]
		}));
	}
}

// saves empty shipping info if does not exist
export function saveEmptyShipping(shippingInfo) {
	return function(dispatch) {
		dispatch({
			type: SAVE_EMPTY_SHIPPING,
			payload: shippingInfo
		});
	}
}

// saves empty payment info if does not exist
export function saveEmptyPayment(paymentInfo) {
	return function(dispatch) {
		dispatch({
			type: SAVE_EMPTY_PAYMENT,
			payload: paymentInfo
		});
	}
}

// confirmation that user is logged in
export function successfulLogin() {
	return function(dispatch) {
		dispatch({
			type: CONFIRM_LOGGED_IN,
			payload: true
		});
	}
}

// update shipping info to store and db
export function updateShipping(userID, shippingInfo) {
	return function(dispatch) {
		fetch(`http://localhost:5000/shipping/update-shipping/${userID}`, {
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"x-auth-token": localStorage.getItem('token')
			},
			method: 'PUT',
			body: JSON.stringify(shippingInfo)
		})
		.then( () => dispatch({
			type: UPDATE_SHIPPING,
			payload: shippingInfo
		}));
	}
}

// update payment info to store and db
export function updatePayment(userID, paymentInfo) {
	return function(dispatch) {
		fetch(`http://localhost:5000/payment/update-payment/${userID}`, {
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"x-auth-token": localStorage.getItem('token')
			},
			method: 'PUT',
			body: JSON.stringify(paymentInfo)
		})
		.then( () => dispatch({
			type: UPDATE_PAYMENT,
			payload: paymentInfo
		}));
	}
}

// update login info to store and db
export function updateLogin(userInfo, newLoginInfo) {
	return function(dispatch) {
		fetch(`http://localhost:5000/user/update-profile/${userInfo._id}`, {
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"x-auth-token": localStorage.getItem('token')
			},
			method: 'PUT',
			body: JSON.stringify(newLoginInfo)
		})
		.then( () => {
			let obj = {
				_id: userInfo._id,
				firstName: newLoginInfo.firstName,
				lastName: newLoginInfo.lastName,
				email: newLoginInfo.email,
				pass: newLoginInfo.pass,
				orderNum: userInfo.orderNum
			};
			
			dispatch({
				type: UPDATE_LOGIN,
				payload: obj
			});
		});
	}
}

export function setNewOrderNum(userID, newOrderNum) {
	return function(dispatch) {
		fetch(`http://localhost:5000/user/new-order-num/${userID}`, {
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"x-auth-token": localStorage.getItem('token')
			},
			method: 'PUT',
			body: JSON.stringify({orderNum: newOrderNum})
		})
		.then(() => dispatch({
			type: NEW_ORDER_NUM,
			payload: newOrderNum
		}));
	}
}

export function signOut() {
	return function(dispatch) {
		localStorage.removeItem('token');
		
		dispatch({
			type: SAVE_USER,
			payload: {
				firstName: '',
				lastName: '',
				email: '',
				pass: ''
			}
		});
		
		dispatch({
			type: SAVE_EMPTY_PAYMENT,
			payload: {
				customerID: '',
				cardHolder: '',
				cardNumber: '',
				cvc: '',
				expMonth: '',
				expYear: ''
			}
		});
		
		dispatch({
			type: SAVE_EMPTY_SHIPPING,
			payload: {
				customerID: '',
				areaCode: '',
				phoneNumber: '',
				street: '',
				city: '',
				province: '',
				postalCode: ''
			}
		});
		
		dispatch({
			type: SIGN_OUT,
			payload: false
		});
	}
}