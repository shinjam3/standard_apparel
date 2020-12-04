import React, { Component } from 'react';
import {connect} from 'react-redux';

import Login from '../components/Login';
import LoggedIn from '../components/LoggedIn';

class Profile extends Component {	
	// checks to see if user is logged in
	checkLoggedIn = () => {
		if (this.props.loggedIn) {
			return (
				<div>
					<LoggedIn />
				</div>
			);
		}
		else {
			return (
				<div>
					<Login />
				</div>
			);
		}
	}
	
	render() {
		return (
			<div style={{fontFamily:'Courier New, Courier, monospace'}}>
				{this.checkLoggedIn()}
			</div>
		);
	};
	
}

const mapStateToProps = state => ({
	loggedIn: state.userInfo.loggedIn
});

export default connect(mapStateToProps)(Profile);