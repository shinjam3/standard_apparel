import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Joi from 'joi-browser';
import '../style.css'

class ForgotPass extends Component {
	state = {
		user: { email: '' },
		submitted: false,
		errorClass: 'register-error'
	}
	
	
	// validation schema
	schema = {
		email: Joi.string().email().required().label('Email')
	}
	
	
	// validation
	validate = () => {
		const result = Joi.validate(this.state.user, this.schema, {
			abortEarly: false
		});
		
		if (result.error) {			
			this.setState({
				errorClass: 'register-error show'
			});
			return false;
		}
		else return true;
	}
	
	
	// sets user input email
	handleChange = (e) => {
		this.setState({
			user: {email: e.target.value}
		});
	}
	
	
	handleSubmit = (e) => {
		e.preventDefault();
		
		if (this.validate()) {
			this.setState({
				submitted: true
			});
			setTimeout(function() {
				alert('Note: This is just a simulation. There will be no email sent to your account.');
			}, 1000);
		}
		
		return;
	}
	
	
	conditionalRender = () => {
		if (!this.state.submitted) {
			return (
				<div>
					<h1 style={h1Style}>Reset Password</h1>
					<h3 style={h3Style}>Not to worry, enter your account's email and we will help you reset your password immediately.</h3>
					
					<div className={this.state.errorClass}>Please enter a valid email address.</div>
					
					<form onSubmit={this.handleSubmit}>
						<input style={inputStyle} type='text' placeholder='Email' value={this.state.user.email} onChange={this.handleChange} />
						<button className='register-button' type='submit'>Reset Password</button>
					</form>
				</div>
			);
		}
		else {
			return (
				<div style={divStyle}>
					<h3 style={h3Style}>An email will be sent to {this.state.user.email} with instructions on how to reset your password.</h3>
					<h3 style={h3Style}>Click <Link to='/profile'><u>here</u></Link> to sign into your account after you have reset your password.</h3>
				</div>
			);
		}
	}
	
	
	render() {
		return (
			<div style={{fontFamily:'Courier New, Courier, monospace'}}>
				{this.conditionalRender()}
			</div>
		);
	}
}

const h1Style = {textAlign:'center', paddingTop:'50px', paddingBottom:'20px'}
const h3Style = {margin:'auto', textAlign:'center', padding:'20px'}
const inputStyle = {display:'block', margin:'auto', width:'250px'}
const divStyle = {
	backgroundColor: 'ghostwhite',
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-evenly',
	width: '80vw',
	margin: 'auto',
	marginTop: '50px',
	marginBottom: '50px',
	boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
	borderRadius: '10px'
}

export default ForgotPass;
