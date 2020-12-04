import React, { Component } from 'react';

class CartItem extends Component {
	state = {
		_id: this.props.cartItem._id,
		title: this.props.cartItem.title,
		price: this.props.cartItem.price,
		imgsrc: this.props.cartItem.imgsrc,
		quantity: this.props.cartItem.quantity
	};
	
	componentDidMount = () => {
		let x = parseFloat((this.state.price*this.state.quantity).toFixed(2));
		this.setState({
			total: x
		});
	}
	
	handleDelete = () => {
		this.props.deleteItem(this.state._id);
	};
	
	render() {
		return (
			<div className='cart-item-container'>
				<div className='cart-item-div item'>
					<h4 className='cart-item-h4'>Item</h4>
					<img className='cart-item-img' src={this.state.imgsrc} />
					<p style={{fontSize:'14px', textAlign:'center'}}>{this.state.title}</p>
				</div>
				
				<div className='cart-item-mobile'>
					<div className='cart-item-div price'>
						<h4 className='cart-item-h4'>Price</h4>
						<p className='cart-item-p'>${this.state.price}</p>
					</div>
					
					<div className='cart-item-div quantity'>
						<h4 className='cart-item-h4'>Quantity</h4>
						<p className='cart-item-p'>{this.state.quantity}</p>
					</div>
					
					<div className='cart-item-div total'>
						<h4 className='cart-item-h4'>Total</h4>
						<p className='cart-item-p'>${this.state.total}</p>
					</div>
				</div>
				
				<div className='cart-item-div delete'>
					<div style={{display:'block', margin:'auto', marginTop:'45px', width:'55px'}}>
						<button onClick={this.handleDelete} className='cart-item-button'>x</button>
					</div>
				</div>
			</div>
		);
	};
}

export default CartItem;