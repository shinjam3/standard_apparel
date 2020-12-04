import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updatePayment} from '../actions/userActions';
import '../style.css';

class Payment extends Component {
	state = {
		disabled: true,
		popUpClass: 'popup',
		paymentInfo: this.props.paymentInfo
	}
	
	// sets entered infomation to temporary state
	handleCardNumberChange = (e) => {
		this.setState({
			paymentInfo: {...this.state.paymentInfo, cardNumber: e.target.value}
		});
	}
	
	// sets entered infomation to temporary state
	handleMonthChange = (e) => {
		this.setState({
			paymentInfo: {...this.state.paymentInfo, expMonth: e.target.value}
		});
	}
	
	// sets entered infomation to temporary state
	handleYearChange = (e) => {
		this.setState({
			paymentInfo: {...this.state.paymentInfo, expYear: e.target.value}
		});
	}
	
	// sets entered infomation to temporary state
	handleNameChange = (e) => {
		this.setState({
			paymentInfo: {...this.state.paymentInfo, cardHolder: e.target.value}
		});
	}
	
	// sets entered infomation to temporary state
	handleCvcChange = (e) => {
		this.setState({
			paymentInfo: {...this.state.paymentInfo, cvc: e.target.value}
		});
	}
	
	// disables form field on save
	toggleDisabled = () => {
		let x = !(this.state.disabled);
		this.setState({
			disabled: x
		});
	}
	
	// updates payment into to db and store
	updatePaymentInfo = () => {
		this.props.updatePayment(this.props.loginInfo._id, this.state.paymentInfo);
		
		// popup message to confirm payment info updated
		this.setState({
			popUpClass: 'popup show'
		});
		
		// timed fade out of popup message
		setTimeout( () => {	this.setState({ popUpClass: 'popup fade' })	}, 1000);
		setTimeout( () => {	this.setState({ popUpClass: 'popup hidden' }) }, 1900);
		
		this.toggleDisabled();
	}
	
	render() {
		return (
			<div style={{fontFamily:'Courier New, Courier, monospace'}}>
				<form className='payment-form'>
					<h2 className='orderinfo-h2'>Payment Information</h2>
					
					<div className='payment-div'>
						<h4 className='payment-h4'>Card Number</h4>
						<input autoComplete='new-password' onChange={this.handleCardNumberChange} disabled={this.state.disabled} className='payment-input' type='text' id='cardnumber' placeholder='Card Number' value={this.state.paymentInfo.cardNumber} />
					</div>
						
					<div className='payment-div'>
						<h4 className='payment-h4'>Expiry Date</h4>
						<input autoComplete='new-password' onChange={this.handleMonthChange} disabled={this.state.disabled} className='payment-input' type='text' id='expmonth' placeholder='MM' value={this.state.paymentInfo.expMonth} />
						<input autoComplete='new-password' onChange={this.handleYearChange} disabled={this.state.disabled} className='payment-input' type='text' id='expyear' placeholder='YYYY' value={this.state.paymentInfo.expYear} />
					</div>
					
					<div className='payment-div'>
						<h4 className='payment-h4'>Cardholder Name</h4>
						<input autoComplete='new-password' onChange={this.handleNameChange} disabled={this.state.disabled} className='payment-input' type='text' id='cardholdername' placeholder='Cardholder Name' value={this.state.paymentInfo.cardHolder} />
					</div>
					
					<div className='payment-div'>
						<h4 className='payment-h4'>CVC</h4>
						<input autoComplete='new-password' onChange={this.handleCvcChange} disabled={this.state.disabled} className='payment-input' type='text' id='cvc' placeholder='Ex. 311' value={this.state.paymentInfo.cvc} />
					</div>
				</form>
				
				<div style={{display:'flex', justifyContent:'space-evenly', width:'150px', margin:'auto', paddingBottom:'50px'}}>
					<button onClick={this.toggleDisabled} className='editprofile-button'>Edit</button>
					<button onClick={this.updatePaymentInfo} className='editprofile-button'>Save</button>
				</div>
				
				<div className={this.state.popUpClass}>Payment Information Updated.</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loginInfo: state.userInfo.loginInfo,
	paymentInfo: state.userInfo.paymentInfo
});

export default connect(mapStateToProps, {updatePayment})(Payment);