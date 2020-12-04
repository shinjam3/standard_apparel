import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
import '../style.css';
import {saveUser, fetchShipping, fetchPayment, saveEmptyShipping, saveEmptyPayment, successfulLogin} from '../actions/userActions';
import {connect} from 'react-redux';

class Login extends Component {
	state = {
		errorClass: 'register-error',
		loginInfo: {
			email: '',
			pass: ''
		}
	}
	
	
	// saves entered user email for verification
	handleEmail = (e) => {
		let x = this.state.loginInfo.pass; 
		this.setState({
			loginInfo: {
				email: e.target.value,
				pass: x
			}
		});
	}
	
	
	// saves entered user password for verification
	handlePassword = (e) => {
		let y = this.state.loginInfo.email; 
		this.setState({
			loginInfo: {
				email: y,
				pass: e.target.value
			}
		});
	}
	
	
	handleSubmit = (e) => {
		e.preventDefault();
		
		// gets existing user data to verify if entered info matches any existing user info
		fetch('http://localhost:5000/login', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.loginInfo) // body data type must match "Content-Type" header
		})
		.then(res => {
			if(!res.ok) this.incorrect();
			else this.saveInfo(res.headers.get('x-auth-token'));
			return;
		});
	}
	
	
	// displays alert message if entered information is invalid
	incorrect = () => {
		this.setState({
			errorClass: 'register-error show'
		});
	}
	
	
	// verifies if entered information matches existing user info
	saveInfo = (token) => {
		localStorage.setItem("token", token);
		const user = jwt_decode(token);
		user.pass = '';
		
		// saves logged in user information to store
		this.props.saveUser(user);
		
		
		// fetches user payment information and saves to store
		fetch(`http://localhost:5000/payment/${user._id}`, {
			headers: {
				'x-auth-token': token
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data[0]===undefined) {
				this.props.saveEmptyPayment({
					customerID: user._id,
					cardHolder: '',
					cardNumber: '',
					cvc: '',
					expMonth: '',
					expYear: ''
				});
			}
			else {
				this.props.fetchPayment(user._id)
			}
		});	
		
		// fetches user shipping information and saves to store
		fetch(`http://localhost:5000/shipping/${user._id}`, {
			headers: {
				'x-auth-token': token
			}
		})
		.then(response => response.json())
		.then(data => {
			if(data[0]===undefined) {
				this.props.saveEmptyShipping({
					customerID: user._id,
					areaCode: '',
					phoneNumber: '',
					street: '',
					city: '',
					province: '',
					postalCode: ''
				});
			}
			else {
				this.props.fetchShipping(user._id);
			}
		});
		
		// confirms logged in user
		this.props.successfulLogin();
	}

	
	render() {
		return (
			<div style={{fontFamily:'Courier New, Courier, monospace'}}>
				<h1 className='login-h1'>Sign In</h1>
				<h4 className='login-h4'>Please sign in to view your online shopping cart.</h4>
				
				<div className={this.state.errorClass}>
					<p>The sign in information is incorrect. Please re-enter information.</p>
				</div>
				
				<form className='login-form' onSubmit={this.handleSubmit}>
					<label className='login-label' htmlFor='email'>Email</label>
					<br />
					<input autoComplete='off' className='login-input' id='email' type='text' onChange={this.handleEmail} />
					<br />
					
					<label className='login-label' htmlFor ='password'>Password</label>
					<br />
					<input autoComplete='off' className='login-input' id='password' type='password' onChange={this.handlePassword} />
					<br />
					
					<Link to='/forgot-password'>Forgot Password?</Link>
					
					<button className='login-button' type='submit'>Sign In</button>
				</form>
				
				<button className='login-button' onClick={e => {e.preventDefault(); window.location.href='/register'}}>Create Account</button>
			</div>
		);
	}
}

export default connect(null, {saveUser, fetchShipping, fetchPayment, saveEmptyShipping, saveEmptyPayment, successfulLogin})(Login);