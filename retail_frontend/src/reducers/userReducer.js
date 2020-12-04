/* 
- This is where it is going to evaluate any actions that are committed
- Any actions such as fetching our posts and creating a new post
- For actions we create types which are constants
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

const initialState = {
	loginInfo: {
		firstName: '',
		lastName: '',
		email: '',
		pass: ''
	},
	shippingInfo: {
		customerID: '',
		areaCode: '',
		phoneNumber: '',
		street: '',
		city: '',
		province: '',
		postalCode: ''
	},
	paymentInfo: {
		customerID: '',
		cardHolder: '',
		cardNumber: '',
		cvc: '',
		expMonth: '',
		expYear: ''
	},
	loggedIn: false
}

/*
- the action must have a type, and that is what the function is evaluating
- One of the ways to evaluate the type is using a switch
*/
export default function(state=initialState, action) {
	switch(action.type) {
		case SAVE_USER: return {
			...state,
			loginInfo: action.payload
		};
		
		case FETCH_SHIPPING: return {
			...state,
			shippingInfo: action.payload
		};
		
		case FETCH_PAYMENT: return {
			...state,
			paymentInfo: action.payload
		};
		
		case SAVE_EMPTY_SHIPPING: return {
			...state,
			shippingInfo: action.payload
		};
		
		case SAVE_EMPTY_PAYMENT: return {
			...state,
			paymentInfo: action.payload
		};
		
		case CONFIRM_LOGGED_IN: return {
			...state,
			loggedIn: true
		};
		
		case UPDATE_SHIPPING: return {
			...state,
			shippingInfo: action.payload
		};
		
		case UPDATE_PAYMENT: return {
			...state,
			paymentInfo: action.payload
		};
		
		case UPDATE_LOGIN: return {
			...state,
			loginInfo: action.payload
		};
		
		case NEW_ORDER_NUM: return {
			...state,
			loginInfo: {...state.loginInfo, orderNum: action.payload}
		};
		
		case SIGN_OUT: return {
			...state,
			loggedIn: false
		};
		
		default: return state;
	}
}