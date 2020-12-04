import React, { Component } from 'react';
import unsplash1 from '../media/unsplash1.jpg';
import unsplash2 from '../media/unsplash2.jpg';
import unsplash3 from '../media/unsplash3.jpg';

class Home extends Component {	
	render() { 
		return (
			<div style={{fontFamily:'Courier New, Courier, monospace'}}>
				<div className='home-div'>
					<div>
						<h1 className='home-h1'>Who We Are</h1>
						<img className='home-img' src={unsplash3} />
					</div>
					
					<p className='home-p'>
					For a fraction of the cost of clothing prices at major brands, 
					our Canadian based eCommerce company will provide the 
					same quality apparel, without having you leave your home.
					</p>
				</div>
				
				<div className='home-div two'>
					<div>
						<h1 className='home-h1'>What We Sell</h1>
						<img className='home-img' src={unsplash2} />
					</div>
					
					<p className='home-p'>
					Our aim is to bring back the simplicity of clean and undecorated 
					apparel. Clothing without text and graphics highlight the colors 
					and shape of casual and formal attires. Our catalog consists of 
					a multitude of clothing items for various seasons and occasions. 
					</p>					
				</div>
				
				<div className='home-div'>
					<div>
						<h1 className='home-h1'>Register to Shop</h1>
						<img className='home-img' src={unsplash1} />
					</div>
					
					<p className='home-p'>
					In order to make purchases, please create a free account 
					or sign in to an existing account. Points will be added 
					to your account with every purchase, and can be redeemed as 
					credit towards future payments!
					</p>
				</div>
			</div>
		);
	}	
}

export default Home;
