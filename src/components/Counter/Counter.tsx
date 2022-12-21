import React from 'react';
import {CounterManagement} from './CounterManagement';
import {Tablo} from './Tablo';
import {ButtonCounterType} from '../../App';

type CounterPropsType = {
	counter: number
	maxNumber: number
	minNumber: number
	stepNumber: number
	buttonCounterOnClickCallback: (type: ButtonCounterType) => void
}

export const Counter: React.FC<CounterPropsType> = (props) => {

	return (
		<div className='counter'>
			<h2 className="title">Tablo</h2>
			<Tablo counter={props.counter} maxNumber={props.maxNumber} minNumber={props.minNumber}></Tablo>
			<CounterManagement counter={props.counter} maxNumber={props.maxNumber} minNumber={props.minNumber} stepNumber={props.stepNumber} buttonCounterOnClickCallback={props.buttonCounterOnClickCallback}></CounterManagement>
		</div>
	)
}