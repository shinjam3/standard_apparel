/* 
- This is where it is going to evaluate any actions that are committed
- Any actions such as fetching our posts and creating a new post
- For actions we create types which are constants
*/
import {FETCH_CART, ADD_TO_CART, DELETE_CART_ITEM, CLEAR_CART} from '../actions/types';

const initialState = {
	cartItems: []
}

/*
- the action must have a type, and that is what the function is evaluating
- One of the ways to evaluate the type is using a switch
*/
export default function(state=initialState, action) {
	switch(action.type) {
		case FETCH_CART: return {
			...state,
			cartItems: action.payload
		};
		
		case ADD_TO_CART: return {
			...state,
			cartItems: [...state.cartItems, action.payload]
		};
		
		case DELETE_CART_ITEM: return {
			...state,
			cartItems: [...state.cartItems.filter((item) => item._id !== action.payload)]
		};
		
		case CLEAR_CART: return {
			...state,
			cartItems: action.payload
		}
		
		default: return state;
	}
}