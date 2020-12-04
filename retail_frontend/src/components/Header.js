import React from 'react';
import {Link} from 'react-router-dom';
import Nav from './Nav.js';
import '../style.css'

class Header extends React.Component{
	changeBackground(e) {
		e.target.style.background = 'white';
	}
	
	defaultBackground(e) {
		e.target.style.background = '#99ffcc';
	}
	
	handleSubmit(e) {
		e.preventDefault();
	}
	
	render() {
		return (
			<React.Fragment>
				<header>
					<div className='header-div'>
						<Link style={linkStyle} to='/'>Standard Apparel</Link>
					</div>
					
					<Nav />
				</header>
			</React.Fragment>
		);
	}
}

const linkStyle = {
	color: 'black',
	textDecoration: 'none',
	textAlign: 'center',
	width: '325px',
	fontFamily: 'Brush Script MT, Brush Script Std, cursive',
	fontSize: '45px',
	fontWeight: 'bold',
	marginRight: '50px',
	marginLeft: '50px',
	marginBottom: '10px'
}

export default Header;