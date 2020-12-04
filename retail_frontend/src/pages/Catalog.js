import React, { Component } from 'react';
import Items from '../components/Items.js';

class Catalog extends Component {
	state = {
		httpData: [],
		newItems: [],
		tops: [],
		bottoms: [],
		accessories: []
	}
	
	componentDidMount() {
		this.checkSection();
	}
	
	// puts items with the same category in the same array
	sortCategories = () => {		
		this.setState({
			newItems: [...this.state.httpData.filter( (item) => item.new===1 )]
		});
		
		this.setState({
			tops: [...this.state.httpData.filter( (item) => item.category==='tops' )]
		});
		
		this.setState({
			bottoms: [...this.state.httpData.filter( (item) => item.category==='bottoms' )]
		});
		
		this.setState({
			accessories: [...this.state.httpData.filter( (item) => item.category==='accessories' )]
		});
	}
	
	// fetches catalog of specific section of current page
	checkSection = () => {
		if (this.props.section==='women') {
			fetch('http://localhost:5000/catalog/women')
			.then(response => response.json())
			.then(data => this.setState({
					httpData: data
				})
			)
			.then( () => this.sortCategories() )
		}
		else if (this.props.section==='men') {
			fetch('http://localhost:5000/catalog/men')
			.then(response => response.json())
			.then(data => this.setState({
					httpData: data
				})
			)
			.then( () => this.sortCategories() )
		}
		else if (this.props.section==='kids') {
			fetch('http://localhost:5000/catalog/kids')
			.then(response => response.json())
			.then(data => this.setState({
					httpData: data
				})
			)
			.then( () => this.sortCategories() )
		}
	}
	
	render() {
		return (
			<div style={{fontFamily: 'Courier New, Courier, monospace'}}>
				<div className='catalog-container'>
					<h2 className='catalog-h2'>New Arrivals</h2>
					<Items items={this.state.newItems} />
				</div>
						
				<div className='catalog-container'>
					<h2 className='catalog-h2'>Tops</h2>
					<Items items={this.state.tops} />
				</div>

				<div className='catalog-container'>
					<h2 className='catalog-h2'>Bottoms</h2>
					<Items items={this.state.bottoms} />
				</div>
					
				<div className='catalog-container'>
					<h2 className='catalog-h2'>Accessories</h2>
					<Items items={this.state.accessories} />
				</div>
			</div>
		);
	}	
}

export default Catalog;