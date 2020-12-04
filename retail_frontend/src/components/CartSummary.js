import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchCart, deleteCartItem} from '../actions/cartActions';
import '../style.css';

import CartItems from './CartItems.js';

// calculating totals were tested using Jest at the "test" folder in the route directory
class CartSummary extends Component {
	// calculates subtotal
	calculateSubTotal = () => {
		let x = 0;
		let i;
		let lst = this.props.cartItems;
		
		for (i=0; i<lst.length; i++) {
			x += parseFloat(((lst[i].price)*(lst[i].quantity)).toFixed(2));
		}
		
		return parseFloat(x.toFixed(2));				
	}
	
	
	// calculates total
	calculateTotal = () => {
		let x = 0;
		let subT = 0;
		let i;
		let lst = this.props.cartItems;
		
		for (i=0; i<lst.length; i++) {
			x += parseFloat(((lst[i].price)*(lst[i].quantity)).toFixed(2));
		}
		
		subT = parseFloat(x.toFixed(2));
		return parseFloat(((subT*0.13)+subT).toFixed(2));
	}
	
	
	// fetches online cart for logged in user and saves it to the store
	componentDidMount = () => {
		this.props.fetchCart(this.props.loginInfo.orderNum);
	}
	
	
	// adjusts totals after deleting an item and updates store and db
	handleDelete = (itemID) => {
		this.props.deleteCartItem(itemID);
	}
	
	
	// proceed to checkout
	handleClick = () => {
		this.props.proceed();
	}
	
	
	render() {
		return (
			<div style={{fontFamily:'Courier New, Courier, monospace'}}>
				<div className='cart-summary-container'>
					<h2 className='cart-summary-h2'>Cart Summary</h2>
					
					<CartItems cartItems={this.props.cartItems} deleteItem={this.handleDelete} />
					
					<div className='cart-summary-totals'>
						<h5>Subtotal: ${this.calculateSubTotal()}</h5>
						<h5>Tax (HST): 13%</h5>
						<h5>Order Total: ${this.calculateTotal()}</h5>
					</div>
					
					<button className='orderinfo-button cartsummary' onClick={this.handleClick}>Proceed to Checkout</button>
				</div>
			</div>
		);
	}	
}

const mapStateToProps = state => ({
	cartItems: state.cartItems.cartItems,
	loginInfo: state.userInfo.loginInfo
});

export default connect(mapStateToProps, {fetchCart, deleteCartItem})(CartSummary);