import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {clearCart} from '../actions/cartActions';
import {setNewOrderNum, signOut} from '../actions/userActions';
import '../style.css';

import CartSummary from './CartSummary.js';
import Shipping from './Shipping.js';
import Payment from './Payment.js';
import EditProfile from './EditProfile.js';
import CloseAccount from './CloseAccount';

class LoggedIn extends Component {
	state = {
		currentPage: 'cart',
		cartClass: 'logged-nav-button active',
		editClass: 'logged-nav-button',
		closeClass: 'logged-nav-button',
		signoutClass: 'logged-nav-button',
		proceedToCheckout: false,
		backToCart: true,
		orderPlaced: false
	}
	
	
	// displays shopping cart
	selectCart = () => {
		this.setState({
			currentPage: 'cart',
			cartClass: 'logged-nav-button active',
			editClass: 'logged-nav-button',
			closeClass: 'logged-nav-button',
			signoutClass: 'logged-nav-button'
		});
	}
	
	
	// displays personal information
	selectPersonal = () => {
		this.setState({
			currentPage: 'edit',
			cartClass: 'logged-nav-button',
			editClass: 'logged-nav-button active',
			closeClass: 'logged-nav-button',
			signoutClass: 'logged-nav-button'
		});
	}
	
	
	// displays close account section
	selectClose = () => {
		this.setState({
			currentPage: 'close',
			cartClass: 'logged-nav-button',
			editClass: 'logged-nav-button',
			closeClass: 'logged-nav-button active',
			signoutClass: 'logged-nav-button'
		});
	}
	
	
	// signs out the user
	selectSignout = () => {
		this.selectCart();
		this.props.signOut();
		this.props.clearCart();
	}
	
	
	// checks checkout
	checkProceedToCheckout = () => {
		this.setState({
			proceedToCheckout: true,
			backToCart: false,
			orderPlaced: false
		});
	}
		
		
	// places order with current shopping cart items and clears shopping cart
	placeOrder = () => {
		let newOrderNum = Math.floor(Math.random() * 100000);
		
		// makes a new record containing specific order history
		fetch('http://localhost:5000/orders', {
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"x-auth-token": localStorage.getItem('token')
			},
			method: 'POST',
			body: JSON.stringify({customerID: this.props.loginInfo._id, orderNum: this.props.loginInfo.orderNum})
		});
		
		// clears shopping cart
		this.props.clearCart();
		
		// sets new orderNum to logged in user
		this.props.setNewOrderNum(this.props.loginInfo._id, newOrderNum);
		
		this.setState({
			proceedToCheckout: false,
			backToCart: true,
			orderPlaced: true
		});
		
		setTimeout(function() {
			alert('Note: This is just a simulation. There will be no email sent to your account.'); 
		}, 1000);
	}
	
	
	// displays cart after purchase has been made
	backToCart = () => {
		this.setState({
			proceedToCheckout: false,
			backToCart: true,
			orderPlaced: false
		});
	}
		
		
	// handles which components are displayed when checking out an order
	checkout = () => {
		if(this.state.proceedToCheckout && !this.state.backToCart && !this.state.orderPlaced) {
			return (
				<div className='orderinfo'>
					<Shipping />
					<Payment />
					
					<div className='orderinfo-button-div'>
						<button className='orderinfo-button' onClick={this.backToCart}>Back to Cart</button>
						<button className='orderinfo-button' onClick={this.placeOrder}>Place Order</button>
					</div>
				</div>
			);
		}
		else if(this.state.orderPlaced) {
			return(
				<div style={orderStyle}>
					<h4 style={{textAlign:'center', width:'100%', padding:'30px', paddingBottom:'20px'}}>Thank you for your purchase. An email has been 
					sent to confirm your order. Your order will arrive in 3-5 business days.</h4>
					
					<button className='orderinfo-button' onClick={this.backToCart}>Back to Profile</button>
				</div>
			);
		}
		else {
			return (
				<div>
					<CartSummary proceed={this.checkProceedToCheckout} />
				</div>
			);
		}
	}
	
	
	// Check to see which section the user selcted on the profile page
	checkPage = () => {
		if(this.state.currentPage==='cart') {	
			return (
				<div>
					{this.checkout()}
				</div>
			);
		}
	 	else if(this.state.currentPage==='edit') {
			return(
				<div>
					<EditProfile />
				</div>
			);
		}
		else if(this.state.currentPage==='close') {
			return(
				<div>
					<CloseAccount />
				</div>
			);
		}
	}
		
		
	render() {
		return (
			<Fragment>
				<div className='logged-nav-container'>
					<h1 className='login-h1'>Welcome, {this.props.loginInfo.firstName}.</h1>
					<nav className='logged-nav'>
						<button onClick={this.selectCart} className={this.state.cartClass}>Shopping Cart</button>
						<button onClick={this.selectPersonal} className={this.state.editClass}>Edit Profile</button>
						<button onClick={this.selectClose} className={this.state.closeClass}>Close Account</button>
						<button onClick={this.selectSignout} className={this.state.signoutClass}>Sign Out</button>
					</nav>
				</div>
					
				{this.checkPage()}
			</Fragment>
		);
	}	
}

const orderStyle = {
	backgroundColor: 'cornsilk',
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-evenly',
	width: '80vw',
	margin: 'auto',
	marginTop: '50px',
	marginBottom: '50px',
	paddingBottom: '20px',
	boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
	borderRadius: '10px'
}

const mapStateToProps = state => ({
	loginInfo: state.userInfo.loginInfo,
});

export default connect(mapStateToProps, {clearCart, setNewOrderNum, signOut})(LoggedIn);