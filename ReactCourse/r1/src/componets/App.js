import React from 'react';
import CountButton from './CountButton/CountButton';
import SearchBar from './SearchBar/SearchBar';

const App = () => {
	const myitem = 'Vi';

	return (
		<div>
			<CountButton incrementBy={1} buttonColor={'red'} />
			<CountButton incrementBy={5} buttonColor={'green'} />
			<SearchBar />
		</div>
	);
};

export default App;
