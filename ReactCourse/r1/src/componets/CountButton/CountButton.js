import React, { useState } from 'react';
import './countButton.css';

const CountButton = props => {
	const [currentCount, setCurrentCount] = useState(0);

	const handleClick = () => {
		setCurrentCount(currentCount + props.incrementBy);
	};

	const buttonStyle = {
		backgroundColor: props.buttonColor,
	};
	return (
		<div className="button-style">
			<button style={buttonStyle} onClick={handleClick}>
				+{props.incrementBy}
			</button>
			<div>{currentCount}</div>
		</div>
	);
};

export default CountButton;
