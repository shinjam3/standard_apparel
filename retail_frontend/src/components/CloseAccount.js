import React, { Component } from 'react';
import {connect} from 'react-redux';
import {clearCart} from '../actions/cartActions';
import {signOut} from '../actions/userActions';
import '../style.css';

class CloseAccount extends Component {
	state = {
		errorClass: 'register-error',
		user: {
			email: this.props.loginInfo.email,
			pass: ''
		}
	}
	
	
	// displays alert message if entered password is invalid
	incorrect = () => {
		this.setState({
			errorClass: 'register-error show'
		});
	}
	
	
	handleChange = (e) => {
		this.setState({
			user: {
				email: this.props.loginInfo.email,
				pass: e.target.value
			}
		});
	}
	
	
	onSubmit = (e) => {
		e.preventDefault();
		
		console.log(this.state.user);
		
		// verify if entered info matches any existing user info
		fetch('http://localhost:5000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.user)
		})
		.then(res => {
			if(!res.ok) this.incorrect();
			else {
				fetch(`http://localhost:5000/user/delete-user/${this.props.loginInfo._id}`, {
					headers: {
						'Content-Type': 'application/json',
						"x-auth-token": localStorage.getItem('token')
					},
					method: 'DELETE'
				})
				.then(() => {		
					// removes JWT from local storage and redirects user to account delete page
					localStorage.removeItem('token');
					window.location.href = '/account-deleted';
				});
			}
		});
	}
	
	
	render() {
		return (
			<div style={divStyle}>
				<h2 style={h2Style}>Delete Your Account</h2>
				<h4 style={h4Style}>We are saddened to hear that you will be leaving us.</h4>
				<h4 style={h4Style}>By deleting your account, your account information will be permanently deleted from our database.</h4>
				<h4 style={h4Style}>Please enter your password below to confirm your account's de-activation.</h4>
							
				<div className={this.state.errorClass}>
					<p>The password incorrect. Please re-enter the correct password.</p>
				</div>
									
				<form style={{display:'block', width:'100%'}} onSubmit={this.onSubmit}>
					<input autoComplete='new-password' style={inputStyle} type='password' placeholder='Password' onChange={this.handleChange} />
					<button style={btnStyle} type='submit'>Delete Account</button>
				</form>
			</div>
		);
	}	
}

const h2Style = {
	textAlign: 'center',
	width: '100%',
	margin: '20px'
}

const h4Style = {
	textAlign: 'center',
	width: '80vw',
	paddingBottom: '20px'
}

const inputStyle = {
	display: 'block',
	margin: 'auto',
	marginBottom: '20px',
	width: '200px',
	clear: 'both'
}

const btnStyle = {
	display: 'block',
	margin: 'auto',
	padding: '5px'
}

const divStyle = {
	fontFamily: 'Courier New, Courier, monospace',
	backgroundColor: 'ghostwhite',
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-evenly',
	width: '80vw',
	margin: 'auto',
	marginTop: '50px',
	marginBottom: '50px',
	paddingLeft: '10px',
	paddingRight: '10px',
	paddingBottom: '20px',
	boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
	borderRadius: '10px'
}

const mapStateToProps = state => ({
	loginInfo: state.userInfo.loginInfo
});

export default connect(mapStateToProps, {clearCart, signOut})(CloseAccount);