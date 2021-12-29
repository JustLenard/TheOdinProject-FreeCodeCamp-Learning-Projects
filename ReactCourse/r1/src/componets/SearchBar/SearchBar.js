import React, { useState } from 'react';
import './SearchBar.css';

const numbers = ['1', '2', '3', '4'];

const SearchBar = () => {
	const [searchValue, setSearchValue] = useState('');
	const handleInputChange = event => {
		setSearchValue(event.target.value);
	};

	const handleClearClick = () => {
		setSearchValue('');
	};

	const shouldDisplayButton = searchValue.length > 0;
	const filteredProducts = numbers.filter(product => {
		return product.includes(searchValue);
	});

	return (
		<div>
			<input type="text" value={searchValue} onChange={handleInputChange} />
			{shouldDisplayButton && <button onClick={handleClearClick}>clear</button>}
			<ul>
				{filteredProducts.map(number => {
					return <li key={number}>{number}</li>;
				})}
			</ul>
		</div>
	);
};

export default SearchBar;
