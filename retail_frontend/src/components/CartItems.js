import React, { Component } from 'react';
import CartItem from './CartItem';

class CartItems extends Component {
	render() {
		return (
 			this.props.cartItems.map(
				(cartItem) => (
					<CartItem
						cartItem={cartItem}
						key={cartItem._id}
						deleteItem={this.props.deleteItem}
					/>
				)
			)
		);
	}	
}


export default CartItems;