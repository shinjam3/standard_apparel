import React, { Component } from 'react';
import Item from './Item.js';

class Items extends Component {	
	render() {
		return (
 			this.props.items.map(
				(item) => (
					<Item
						item={item}
						key={item.id}
					/>
				)
			)
		);
	}	
}

export default Items;
