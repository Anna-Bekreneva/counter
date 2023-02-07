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

	const disabledInc = props.counter + props.stepNumber > props.maxNumber || props.counter === props.maxNumber
	const disabledDec = props.counter - props.stepNumber < props.minNumber || props.counter === props.minNumber
	const disabledRes = props.counter - props.stepNumber === props.minNumber || props.counter === props.minNumber

	return (
		<div className='management'>
			<button className='management__button button' type='button' onClick={onClickHandler('inc')} disabled={disabledInc}>inc</button>
			<button className='management__button button' type='button' onClick={onClickHandler('dec')} disabled={disabledDec}>dec</button>
			<button className='management__button button' type='button' onClick={onClickHandler('res')} disabled={disabledRes}>res</button>
		</div>
	)
}