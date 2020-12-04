import React, { Component } from 'react';

import flogo from '../media/flogo.png';
import iglogo from '../media/iglogo.png';
import linkedin from '../media/linkedin.png';

class More extends Component {	
	render() { 
		return (
			<div style={{fontFamily:'Courier New, Courier, monospace'}}>
				<div style={{paddingBottom:'40px'}}>
					<h1 style={h1Style}>Contact Us!</h1>
					
					<div style={containerStyle}>
						<div style={divStyle}>
							<p style={pStyle}>&#128379;</p> 
							<p style={{textAlign:'center', fontSize:'15px', marginBottom: '50px'}}><b>1-800-123-4567</b></p>
						</div>
						
						<div style={divStyle}>
							<p style={pStyle}>&#128231;</p> 
							<p style={{textAlign:'center', fontSize:'15px', marginBottom: '50px'}}><b>hr@standardapparel.com</b></p>
						</div>
						
						<div style={div2Style}>
							<img style={imgStyle} src={flogo} />
							<img style={imgStyle} src={iglogo} />
							<img style={imgStyle} src={linkedin} />
						</div>
					</div>
				</div>
				
				<div style={{backgroundColor:'cornsilk', paddingBottom:'40px'}}>
					<h1 style={h1Style}>Careers</h1>
					
					<div style={jobsDivStyle}>
						<h3 style={{paddingBottom:'15px'}}>Current Jobs Available</h3>
						<ul style={{listStyleType:'none'}}>
							<li style={aStyle}><a href='#'>Front-end Web Developer</a></li>
							<li style={aStyle}><a href='#'>Marketing Intern</a></li>
							<li style={aStyle}><a href='#'>eCommerce Analyst</a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}	
}

const containerStyle = {
	display: 'flex',
	flexFlow: 'row wrap',
	justifyContent: 'space-around',
	alignItems: 'center'
}

const divStyle = {
	width: '250px',
	height: '150px',
	margin: '10px'
}

const div2Style = {
	display:'flex', 
	justifyContent:'space-around',
	alignItems: 'center',
	width: '250px',
	height: '150px',
	margin: '10px'
}

const h1Style = {
	textAlign: 'center',
	paddingTop: '50px'
}

const pStyle = {
	textAlign: 'center',
	fontSize: '30px',
	margin: '15px',
	marginTop: '50px'
}

const imgStyle = {
	maxWidth: '50px',
	maxHeight: '50px'
}

const jobsDivStyle = {
	textAlign: 'center', 
	margin: 'auto',
	paddingTop: '40px'
}

const aStyle = {
	margin: '10px',
	textDecoration: 'underline'
}

export default More;
