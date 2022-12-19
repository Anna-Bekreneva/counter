import React from 'react';

type TabloPropsType = {
	counter: number
	maxNumber: number
	minNumber: number
}

export const Tablo: React.FC<TabloPropsType> = (props) => {

	const text = props.counter === props.maxNumber
		? <span className='counter-tablo__text'>This is max value</span>
		: props.counter === props.minNumber ? <span className='counter-tablo__text'>This is min value</span> : null

	return (
		<div className='counter-tablo tablo'>
			<span className={props.counter === props.maxNumber ? 'counter-tablo__number' +
				' counter-tablo__number--active' : 'counter-tablo__number'}>{props.counter}</span>
			{text}
		</div>
	)
}