import React from 'react';
import {ButtonCounterType} from '../../App';

type ManagementPropsType = {
	counter: number
	stepNumber: number
	buttonCounterOnClickCallback: (type: ButtonCounterType) => void
	maxNumber: number
	minNumber: number
}

export const CounterManagement: React.FC<ManagementPropsType> = (props) => {

	const onClickHandler = (type: ButtonCounterType) => () => props.buttonCounterOnClickCallback(type)

	return (
		<div className='management'>
			<button className='management__button button' type='button' onClick={onClickHandler('inc')} disabled={props.counter === props.maxNumber}>inc</button>
			<button className='management__button button' type='button' onClick={onClickHandler('dec')} disabled={props.counter === props.minNumber}>dec</button>
			<button className='management__button button' type='button' onClick={onClickHandler('res')} disabled={props.counter <= props.minNumber + props.stepNumber}>res</button>
		</div>
	)
}