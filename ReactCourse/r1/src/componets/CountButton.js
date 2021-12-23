import React from 'react';

const CountButton = () => {
	const currentCount = 0;

	const handleClick = () => {
		console.log('f');
	};
	return (
		<div>
			<button onClick={handleClick}>+1</button>
			<div>{currentCount}</div>
		</div>
	);
};

export default CountButton;
