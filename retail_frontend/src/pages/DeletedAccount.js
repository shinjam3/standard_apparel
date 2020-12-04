import React, { Component } from 'react';

class DeletedAccount extends Component {	
	render() {
		return (
			<div style={divStyle}>
				<h2 style={h2Style}>Account Successfully Deleted.</h2>
				<h4 style={h4Style}>We hope you shop with us again!</h4>
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
	width: '80vw'
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

export default DeletedAccount;