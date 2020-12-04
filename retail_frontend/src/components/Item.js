import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../actions/cartActions';

class Item extends Component {
	state = {
		popUpClass: 'popup',
		condition: '',
		item: {
			id: this.props.item.id,
			category: this.props.item.category,
			title: this.props.item.title,
			price: this.props.item.price,
			imgsrc: this.props.item.imgsrc,
			quantity: 0
		}
	};
	
	handleMinus = () => {
		if (this.state.item.quantity>0) {
			let x = this.state.item.quantity - 1;
			this.setState({
				item: {
					...this.state.item,
					quantity: x
				}
			});
		}
	};
	
	handlePlus = () => {
		let y = this.state.item.quantity + 1;
		this.setState({
			item: {
				...this.state.item,
				quantity: y
			}
		});
	};
	
	handleSubmit = (e) => {
		e.preventDefault();
		if (this.props.loggedIn) {
			if (this.state.item.quantity>0) {
				this.props.addToCart(this.props.loginInfo, this.state.item);
				
				this.setState({
					condition:  'Item Added To Cart.',
					popUpClass: 'popup show',
					item: {...this.state.item, quantity: 0}
				});
				
				setTimeout( () => {	this.setState({ popUpClass: 'popup fade' })	}, 1000);
				setTimeout( () => {	this.setState({ popUpClass: 'popup hidden' }) }, 1900);
			}
		}
		else {
			this.setState({
				condition: 'Please create a free account or log in to an existing account to have an online shopping cart.',
				popUpClass: 'popup show'
			});
			
			setTimeout( () => {	this.setState({ popUpClass: 'popup fade' })	}, 4000);
			setTimeout( () => {	this.setState({ popUpClass: 'popup hidden' }) }, 4900);
			
			return;
		}
	}
	
	render() {
		return (
			<div style={{display:'flex', flexDirection:'row wrap', justifyContent:'space-evenly'}}>
				<div className='item-div'>
					<div className='item-img-div'>
						<img src={this.state.item.imgsrc} className='item-img' />
					</div>
					
					<h3 style={{textAlign:'center', marginTop:'5px'}}>{this.state.item.title} </h3>
					<h4 style={{textAlign:'center'}}>Price: {this.state.item.price}</h4>
					
					<form onSubmit={this.handleSubmit}>
						<div style={{display:'block', margin:'auto', width:'65px'}}>
							<button type='button' onClick={this.handleMinus} className='item-button'>-</button>
							<input disabled type='text' value={this.state.item.quantity} style={{width:'21px', height:'18px'}}></input>
							<button type='button' onClick={this.handlePlus} className='item-button'>+</button>
						</div>
						
						<button type='submit' className='item-addbutton'>Add To Cart</button>
					</form>
				</div>
				
				<div className={this.state.popUpClass}>{this.state.condition}</div>
			</div>
		);
	};
	
}

const mapStateToProps = state => ({
	loggedIn: state.userInfo.loggedIn,
	loginInfo: state.userInfo.loginInfo
});

export default connect(mapStateToProps, {addToCart})(Item);