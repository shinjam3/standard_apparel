import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateLogin, updateShipping, updatePayment} from '../actions/userActions';
import '../style.css';

class EditProfile extends Component {
	state = {
		loginDisabled: true,
		shippingDisabled: true,
		paymentDisabled: true,
		popUpClass: 'popup',
		section: '',
		loginInfo: this.props.loginInfo,
		shippingInfo: this.props.shippingInfo,
		paymentInfo: this.props.paymentInfo
	}
	
	componentDidMount() {
		setTimeout(function() {
			alert('Note: This is just a simulation. Please do not enter personal information such as your real address and credit card information');
		}, 1000);	
	}
	
	/* LOGIN INFO CODE */
	handleFirstNameChange = (e) => {
		this.setState({
			loginInfo: {...this.state.loginInfo, firstName: e.target.value}
		});
	}
	
	handleLastNameChange = (e) => {
		this.setState({
			loginInfo: {...this.state.loginInfo, lastName: e.target.value}
		});
	}
	
	handleEmailChange = (e) => {
		this.setState({
			loginInfo: {...this.state.loginInfo, email: e.target.value}
		});
	}
	
	handlePassChange = (e) => {
		this.setState({
			loginInfo: {...this.state.loginInfo, pass: e.target.value}
		});
	}
	
	toggleLoginDisabled = () => {
		let x = !(this.state.loginDisabled);
		this.setState({
			loginDisabled: x
		});
	}
	
	updateLoginInfo = () => {
		this.props.updateLogin(this.props.loginInfo, this.state.loginInfo);
		
		this.setState({
			popUpClass: 'popup show',
			section: 'Login'
		});
		
		setTimeout( () => {	this.setState({ popUpClass: 'popup fade' })	}, 4000);
		setTimeout( () => {	this.setState({ popUpClass: 'popup hidden' }) }, 4900);
		
		this.toggleLoginDisabled();
	}
	/* END LOGIN INFO CODE */
	
	
	/* SHIPPING INFO CODE */	
	handleAreaCodeChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, areaCode: e.target.value}
		});
	}
	
	handlePhoneNumberChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, phoneNumber: e.target.value}
		});
	}
	
	handleStreetChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, street: e.target.value}
		});
	}
	
	handleCityChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, city: e.target.value}
		});
	}
	
	handleProvinceChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, province: e.target.value}
		});
	}
	
	handlePostalChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, postalCode: e.target.value}
		});
	}
	
	toggleShippingDisabled = () => {
		let y = !(this.state.shippingDisabled);
		this.setState({
			shippingDisabled: y
		});
	}
	
	updateShippingInfo = () => {
		this.props.updateShipping(this.props.loginInfo._id, this.state.shippingInfo);
		
		this.setState({
			popUpClass: 'popup show',
			section: 'Shipping'
		});
		
		setTimeout( () => {	this.setState({ popUpClass: 'popup fade' })	}, 4000);
		setTimeout( () => {	this.setState({ popUpClass: 'popup hidden' }) }, 4900);
		
		this.toggleShippingDisabled();
	}
	/* END SHIPPING INFO CODE */
	
	
	/* PAYMENT INFO CODE */
	handleCardNumberChange = (e) => {
		this.setState({
			paymentInfo: {...this.state.paymentInfo, cardNumber: e.target.value}
		});
	}
	
	handleMonthChange = (e) => {
		this.setState({
			paymentInfo: {...this.state.paymentInfo, expMonth: e.target.value}
		});
	}
	
	handleYearChange = (e) => {
		this.setState({
			paymentInfo: {...this.state.paymentInfo, expYear: e.target.value}
		});
	}
	
	handleNameChange = (e) => {
		this.setState({
			paymentInfo: {...this.state.paymentInfo, cardHolder: e.target.value}
		});
	}
	
	handleCvcChange = (e) => {
		this.setState({
			paymentInfo: {...this.state.paymentInfo, cvc: e.target.value}
		});
	}
	
	togglePaymentDisabled = () => {
		let z = !(this.state.paymentDisabled);
		this.setState({
			paymentDisabled: z
		});
	}
	
	updatePaymentInfo = () => {
		this.props.updatePayment(this.props.loginInfo._id, this.state.paymentInfo);
		
		this.setState({
			popUpClass: 'popup show',
			section: 'Payment'
		});
		
		setTimeout( () => {	this.setState({ popUpClass: 'popup fade' })	}, 4000);
		setTimeout( () => {	this.setState({ popUpClass: 'popup hidden' }) }, 4900);
		
		this.togglePaymentDisabled();
	}
	/* END PAYMENT INFO CODE */
	
	
	render() {	
		return (
			<div className='edit-container'>
				<div>
					<form className='edit-div'>
						<h2 className='edit-h2'>Login Information</h2>
						
						<label className='edit-label' htmlFor='edit-firstname'>Name</label>
						<br />
						<input value={this.state.loginInfo.firstName} disabled={this.state.loginDisabled} autoComplete='new-password' onChange={this.handleFirstNameChange}  className='edit-login-input' type='text' placeholder='First Name' id='edit-firstname'/>
						<input value={this.state.loginInfo.lastName} disabled={this.state.loginDisabled} autoComplete='new-password' onChange={this.handleLastNameChange} className='edit-login-input' type='text' placeholder='Last Name' />
						<br />
						
						<label className='edit-label' htmlFor='edit-email'>Email</label>
						<br />
						<input disabled={this.state.loginDisabled} autoComplete='new-password' onChange={this.handleEmailChange} value={this.state.loginInfo.email} className='edit-login-input' type='text' placeholder='Email' id='edit-email' />
						<br />
						
						<label className='edit-label' htmlFor='edit-password'>Password</label>
						<br />
						<input disabled={this.state.loginDisabled} autoComplete='new-password' onChange={this.handlePassChange} value={this.state.loginInfo.pass} className='edit-login-input' type='password' placeholder='Password' id='edit-password' />
					</form>
					
					<div style={{display:'flex', flexDirection:'row', justifyContent:'center', paddingTop:'5px', paddingBottom:'10px'}}>
						<button onClick={this.toggleLoginDisabled} className='editprofile-button'>Edit</button>
						<button onClick={this.updateLoginInfo} className='editprofile-button'>Save</button>
					</div>
				</div>
				
				<div>
					<form className='edit-div'>
						<h2 className='edit-h2'>Shipping Address</h2>
						
						<label className='edit-label' htmlFor='edit-areacode'>Phone Number</label>
						<br />
						<input autoComplete='new-password' disabled={this.state.shippingDisabled} value={this.state.shippingInfo.areaCode} style={{marginLeft:'55px', marginBottom:'19px', width:'75px'}} onChange={this.handleAreaCodeChange} type='text' placeholder='Area Code' id='edit-areacode' /> - <input value={this.state.shippingInfo.phoneNumber} autoComplete='new-password' disabled={this.state.shippingDisabled} style={{width:'92px'}} onChange={this.handlePhoneNumberChange} type='text' placeholder='Phone Number' />
						<br />
						
						<label className='edit-label' htmlFor='edit-address'>Address</label>
						<br />
						<input value={this.state.shippingInfo.street} autoComplete='new-password' disabled={this.state.shippingDisabled} onChange={this.handleStreetChange} className='edit-address-input' type='text' placeholder='Street Address' id='edit-address'/>
						<input value={this.state.shippingInfo.city} autoComplete='new-password' disabled={this.state.shippingDisabled} onChange={this.handleCityChange} className='edit-address-input' type='text' placeholder='City' />
						<input value={this.state.shippingInfo.province} autoComplete='new-password' disabled={this.state.shippingDisabled} onChange={this.handleProvinceChange} className='edit-address-input' type='text' placeholder='Province (Ex. ON)' />
						<input value={this.state.shippingInfo.postalCode} autoComplete='new-password' disabled={this.state.shippingDisabled} onChange={this.handlePostalChange} className='edit-address-input' type='text' placeholder='Postal Code' />
					</form>
					
					<div style={{display:'flex', flexDirection:'row', justifyContent:'center', paddingTop:'5px', paddingBottom:'10px'}}>
						<button onClick={this.toggleShippingDisabled} className='editprofile-button'>Edit</button>
						<button onClick={this.updateShippingInfo} className='editprofile-button'>Save</button>
					</div>					
				</div>
				
				<div>
					<form className='edit-div'>
						<h2 className='edit-h2'>Payment Information</h2>
						
						<label className='edit-label' htmlFor='edit-card'>Credit Card</label>
						<br />
						<input value={this.state.paymentInfo.cardHolder} autoComplete='new-password' disabled={this.state.paymentDisabled} onChange={this.handleNameChange} className='edit-payment-input' type='text' placeholder='Cardholder Name' id='edit-card' />
						<input value={this.state.paymentInfo.cardNumber} autoComplete='new-password' disabled={this.state.paymentDisabled} onChange={this.handleCardNumberChange} className='edit-payment-input' type='text' placeholder='Card Number' />
						<input value={this.state.paymentInfo.cvc} autoComplete='new-password' disabled={this.state.paymentDisabled} onChange={this.handleCvcChange} className='edit-payment-input' type='text' placeholder='CVC (Ex. 311)' />
						<br />
						
						<label className='edit-label'>Expiry Date</label>
						<br />
						<input value={this.state.paymentInfo.expMonth} autoComplete='new-password' disabled={this.state.paymentDisabled} style={{marginLeft:'56px', marginBottom:'5px', width:'92px'}} onChange={this.handleMonthChange} type='text' placeholder='Month (MM)' /> <input value={this.state.paymentInfo.expYear} autoComplete='new-password' disabled={this.state.paymentDisabled} style={{width:'92px'}} onChange={this.handleYearChange} type='text' placeholder='Year (YY)' />						
					</form>
					
					<div style={{display:'flex', flexDirection:'row', justifyContent:'center', paddingTop:'5px', paddingBottom:'10px'}}>
						<button onClick={this.togglePaymentDisabled} className='editprofile-button'>Edit</button>
						<button onClick={this.updatePaymentInfo} className='editprofile-button'>Save</button>
					</div>
				</div>
				
				<div className={this.state.popUpClass}>{this.state.section} Information Updated.</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loginInfo: state.userInfo.loginInfo,
	shippingInfo: state.userInfo.shippingInfo,
	paymentInfo: state.userInfo.paymentInfo
});

export default connect(mapStateToProps, {updateLogin, updateShipping, updatePayment})(EditProfile);