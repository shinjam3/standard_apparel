import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../style.css';

class Nav extends Component {
	state = {
		responsiveClass: 'topnav',
		responsive: false
	}
	
	changeBackground(e) {
		e.target.style.color = 'gray';
	}
	
	defaultBackground(e) {
		e.target.style.color = 'black';
	}
	
	dropDown = () => {
		if (!this.state.responsive) {
			this.setState({
				responsiveClass: 'topnav responsive',
				responsive: true
			});
		}
		else {
			this.setState({
				responsiveClass: 'topnav',
				responsive: false
			});
		}	
	}
	
	render() {	
		return (
			<nav className={this.state.responsiveClass}>
				<NavLink
					className='nav-a'
					onMouseOver={this.changeBackground}
					onMouseLeave={this.defaultBackground}
					activeStyle={{ backgroundColor:'#66ffb3' }}
					exact to='/'
				>Home</NavLink>
					
				<NavLink
					className='nav-a'
					onMouseOver={this.changeBackground}
					onMouseLeave={this.defaultBackground}
					activeStyle={{ backgroundColor:'#66ffb3' }}
					exact to='/women'
				>Women</NavLink>
					
				<NavLink
					className='nav-a'
					onMouseOver={this.changeBackground}
					onMouseLeave={this.defaultBackground}
					activeStyle={{ backgroundColor:'#66ffb3' }}
					exact to='/men'
				>Men</NavLink>

				<NavLink 
					className='nav-a'
					onMouseOver={this.changeBackground}
					onMouseLeave={this.defaultBackground}
					activeStyle={{ backgroundColor:'#66ffb3' }}
					exact to='/kids'
				>Kids</NavLink>

				<NavLink 
					className='nav-a'
					onMouseOver={this.changeBackground}
					onMouseLeave={this.defaultBackground}
					activeStyle={{ backgroundColor:'#66ffb3' }}
					exact to='/more'
				>More</NavLink>

				<NavLink 
					className='nav-a'
					onMouseOver={this.changeBackground}
					onMouseLeave={this.defaultBackground}
					activeStyle={{ backgroundColor:'#66ffb3' }}
					exact to='/profile'
				>My Profile</NavLink>
				
				<a className='nav-button' onClick={this.dropDown}>&#9776;</a>
			</nav>
		);
	}
}

export default Nav;