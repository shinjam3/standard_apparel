import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateShipping} from '../actions/userActions';
import '../style.css';

class Shipping extends Component {
	state = {
		disabled: true,
		popUpClass: 'popup',
		shippingInfo: this.props.shippingInfo
	}
	
	// sets entered infomation to temporary state
	handleFirstNameChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, firstName: e.target.value}
		});
	}
	
	// sets entered infomation to temporary state
	handleLastNameChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, lastName: e.target.value}
		});
	}
	
	// sets entered infomation to temporary state
	handleAreaCodeChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, areaCode: e.target.value}
		});
	}
	
	// sets entered infomation to temporary state
	handlePhoneNumberChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, phoneNumber: e.target.value}
		});
	}
	
	// sets entered infomation to temporary state
	handleStreetChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, street: e.target.value}
		});
	}
	
	// sets entered infomation to temporary state
	handleCityChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, city: e.target.value}
		});
	}
	
	// sets entered infomation to temporary state
	handleProvinceChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, province: e.target.value}
		});
	}
	
	// sets entered infomation to temporary state
	handlePostalChange = (e) => {
		this.setState({
			shippingInfo: {...this.state.shippingInfo, postalCode: e.target.value}
		});
	}
	
	// disables form fields on saving
	toggleDisabled = () => {
		let x = !(this.state.disabled);
		this.setState({
			disabled: x
		});
	}
	
	// updates shipping info in store and db
	updateShippingInfo = () => {
		let obj = Object.assign({}, this.state.shippingInfo);
		delete obj.firstName;
		delete obj.lastName;
	
		this.props.updateShipping(this.props.loginInfo._id, obj);
		
		// popup message to confirm shipping info updated
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
				<form className='shipping-form'>
					<h2 className='orderinfo-h2'>Shipping Address</h2>

					<div className='shipping-div'>
						<h4 className='shipping-h4'>Name</h4>
						<input autoComplete='new-password' onChange={this.handleFirstNameChange} disabled={this.state.disabled} className='shipping-input' type='text' id='firstname' placeholder='First Name' value={this.state.shippingInfo.firstName} />
						<input autoComplete='new-password' onChange={this.handleLastNameChange} disabled={this.state.disabled} className='shipping-input' type='text' id='lastname' placeholder='Last Name' value={this.state.shippingInfo.lastName} />
					</div>
					<br />

					<div className='shipping-div'>
					<h4 className='shipping-h4'>Phone Number</h4>
						<input autoComplete='new-password' onChange={this.handleAreaCodeChange} disabled={this.state.disabled} className='shipping-input' type='text' id='areacode' placeholder='Area Code' value={this.state.shippingInfo.areaCode} /> - <input autoComplete='new-password' onChange={this.handlePhoneNumberChange} disabled={this.state.disabled} className='shipping-input' type='text' id='phonenumber' placeholder='Phone Number' value={this.state.shippingInfo.phoneNumber} />
					</div>
					<br />
	
					<div className='shipping-div'>
					<h4 className='shipping-h4'>Address</h4>
						<input autoComplete='new-password' onChange={this.handleStreetChange} disabled={this.state.disabled} className='shipping-input' type='text' id='streetaddress' placeholder='Street Address' value={this.state.shippingInfo.street}/>
						<input autoComplete='new-password' onChange={this.handleCityChange} disabled={this.state.disabled} className='shipping-input' type='text' id='city' placeholder='City' value={this.state.shippingInfo.city} />
						<input autoComplete='new-password' onChange={this.handleProvinceChange} disabled={this.state.disabled} className='shipping-input' type='text' id='province' placeholder='Province' value={this.state.shippingInfo.province} />
						<input autoComplete='new-password' onChange={this.handlePostalChange} disabled={this.state.disabled} className='shipping-input' type='text' id='postalcode' placeholder='Postal Code' value={this.state.shippingInfo.postalCode} />
					</div>
				</form>
				
				<div style={{display:'flex', justifyContent:'space-evenly', width:'150px', margin:'auto', paddingBottom:'50px'}}>
					<button onClick={this.toggleDisabled} className='editprofile-button'>Edit</button>
					<button onClick={this.updateShippingInfo} className='editprofile-button'>Save</button>
				</div>
				
				<div className={this.state.popUpClass}>Shipping Information Updated.</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	loginInfo: state.userInfo.loginInfo,
	shippingInfo: state.userInfo.shippingInfo
});

export default connect(mapStateToProps, {updateShipping})(Shipping);