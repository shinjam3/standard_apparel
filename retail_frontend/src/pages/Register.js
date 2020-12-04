import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../style.css'
import Joi from 'joi-browser';

class Register extends Component {
	state = {
		registered: false,
		confirmPass: '',
		termsAgreed: false,
		couldNotConnect: '',
		errorClass: 'register-error',
		errorMsgs: [],
		termsClass: 'register-terms',
		user: {
			firstName: '',
			lastName: '',
			email: '',
			pass: '',
			orderNum: Math.floor(Math.random() * 100000)
		}
	}
	
	// validation schema
	schema = {
		firstName: Joi.string().required().label('First Name'),
		lastName: Joi.string().required().label('Last Name'),
		email: Joi.string().email().required().label('Email'),
		pass: Joi.string().regex(regEx).required().label('Password'),
		orderNum: Joi.number().required()
	}
	
	
	/*
	validate function for when user submits the form
	if there are validation errors, the error messages will appear
	until the requirements are satisfied
	*/
	validate = () => {
		const result = Joi.validate(this.state.user, this.schema, {
			abortEarly: false
		});
		
		let tempArray = [];
		let joiArray = [];
		let termsArray = [];
		
		// user must agree to terms and conditions
		if (!this.state.termsAgreed) termsArray.push('Please agree to the terms & conditions before signing up.');
		
		if (result.error) {			
			this.setState({
				errorClass: 'register-error show'
			});
			
			joiArray = result.error.details.map(obj => obj.message); 
			joiArray.forEach(str => {
				if(str.includes('required pattern')) {
					tempArray.push(
						<ul style={{listStyleType:'none'}}>
							<li>"Password" must satisfy the following requirements:</li>
							<li>Must have a number</li>
							<li>Must contain at least one upper-case</li>
							<li>Must contain at least one lower-case</li>
							<li>Must contain any of the following symbols: @$!%*?&</li>
							<li>Must be at least 8 characters long</li>
						</ul>
					);
				}
				else tempArray.push(str);
			});
			
			if (this.state.user.pass!==this.state.confirmPass) {
				tempArray.push('Please make sure your passwords match');
			}
			
			this.setState({
				errorMsgs: [...tempArray, ...termsArray]
			});
			
			return false;
		}
		else {
			// checks to see if confirmation password matches
			if (this.state.user.pass!==this.state.confirmPass) {
				tempArray.push('Please make sure your passwords match');
				this.setState({
					errorClass: 'register-error show',
					errorMsgs: [...tempArray, ...termsArray]
				});
				
				return false;
			}
			if (termsArray.length) {
				this.setState({
					errorClass: 'register-error show',
					errorMsgs: termsArray
				});
				return false;
			}
			else {
				this.setState({
					errorClass: 'register-error',
					errorMsgs: termsArray
				});
			}
			return true;
		}
	}
	
	
	// sets user's information
	handleFirstName = (e) => {
		let x = this.state.user;
		this.setState({
			user: {...x, firstName: e.target.value}
		});
	}
	
	handleLastName = (e) => {
		let x = this.state.user;
		this.setState({
			user: {...x, lastName: e.target.value}
		});
	}
	
	handleEmail = (e) => {
		let x = this.state.user;
		this.setState({
			user: {...x, email: e.target.value}
		});
	}
	
	handlePass = (e) => {
		let x = this.state.user;
		this.setState({
			user: {...x, pass: e.target.value}
		});
	}
	
	handleConfirm = (e) => {
		this.setState({
			confirmPass: e.target.value
		});
	}
	
	handleCheck = () => {
		this.setState({
			termsAgreed: !this.state.termsAgreed
		});
	}
	
	
	// sends register info to server
	handleSubmit = (e) => {
		e.preventDefault();
		
		if (this.validate()) {
			fetch('http://localhost:5000/user/register', {
				headers: { "Content-Type": "application/json; charset=utf-8" },
				method: 'POST',
				body: JSON.stringify(this.state.user)
			});
			
			this.setState({
				registered: true
			}); 
		}
	}
	
	
	showTerms = () => {
		this.setState({
			termsClass: 'register-terms show'
		});
	}
	
	hideTerms = () => {
		this.setState({
			termsClass: 'register-terms'
		});
	}
	
	
	checkRegistered = () => {
		if (this.state.registered) {
			return (
				<div>
					<h3 style={{textAlign:'center', padding:'50px'}}>Thank you for registering. Click <Link onClick={() => this.setState({registered: false})} to='/profile'><u>here</u></Link> to sign into your account.</h3>
				</div>
			);
		}
		else {
			return (
				<div style={{fontFamily:'Courier New, Courier, monospace'}}>
					<h1 className='register-h1'>Register</h1>
					<h4 className='register-h4'>Please sign up to view your online shopping cart. It only takes a minute to create a free account.</h4>
					
					<div className={this.state.errorClass}>
						{this.state.errorMsgs.map( msg => <div style={{paddingTop:'15px', paddingBottom:'15px'}}>{msg}</div> )}
						<p>{this.couldNotConnect}</p>
					</div>
					
					<form className='register-form' onSubmit={this.handleSubmit}>
						<div style={{paddingBottom:'50px'}}>
							<input 
								autoComplete='new-password' 
								className='register-input2' 
								type='text' 
								placeholder='First Name' 
								minLength='2'
								onChange={this.handleFirstName} 
							/>
							
							<input 
								autoComplete='new-password' 
								className='register-input3' 
								type='text' 
								placeholder='Last Name' 
								minLength='2'
								onChange={this.handleLastName} 
							/>
						</div>
						
						<input autoComplete='new-password' className='register-input' type='text' placeholder='Email' onChange={this.handleEmail} />
						<input autoComplete='new-password' className='register-input' type='password' placeholder='Password' onChange={this.handlePass} />
						<input autoComplete='new-password' className='register-input' type='password' placeholder='Confirm Password' onChange={this.handleConfirm} />
						<div style={{display:'flex', justifyContent:'center'}}>
							<input style={{marginTop:'2px', marginRight:'5px'}} autoComplete='new-password' id='check' type='checkbox' onChange={this.handleCheck} /> 
							<p> I accept the <a onClick={this.showTerms}><u>Terms & Conditions</u></a>.</p>
						</div>
						
						<button className='register-button' type='submit'>Register</button>
					</form>
					
					<div className={this.state.termsClass}>
						<h3 style={{textAlign:'center', marginBottom:'15px'}}>Terms & Conditions</h3>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
						Mauris sodales eget urna nec tincidunt. Morbi pharetra 
						quam eget vestibulum bibendum. Fusce cursus elementum 
						ligula, quis scelerisque nibh aliquam ut. Mauris rutrum 
						nulla augue, sed faucibus felis posuere eu. Aliquam 
						tristique nunc non erat consequat, sit amet interdum 
						leo porttitor. Aliquam nulla orci, auctor vitae consequat 
						ut, suscipit at justo. Suspendisse mattis sapien quis 
						mauris imperdiet pulvinar. Donec vulputate vel risus 
						vel faucibus. Donec ac massa iaculis nisi dignissim 
						euismod tempor eu massa. Etiam convallis magna nec 
						purus sodales consectetur. Morbi malesuada quis tellus 
						ut convallis. Duis dictum arcu quis dignissim placerat. 
						Fusce interdum non tellus eget egestas. Vestibulum sed 
						sem non enim sodales tempus.
						<button style={{display:'block', margin:'auto', padding:'5px', marginTop:'20px'}} onClick={this.hideTerms}>I Understand</button>
					</div>
				</div>
			);
		}
	}
	
	render() {
		return (
			<div style={{fontFamily:'Courier New, Courier, monospace'}}>
				{this.checkRegistered()}
			</div>
		);
	}	
}

/* 	
	Must have a number
	Must contain at least one upper-case
	Must contain at least one lower-case
	Must contain any of the following symbols [@$!%*?&]
	Should be at least 8 characters long
*/
const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default Register;
