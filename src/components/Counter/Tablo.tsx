import React from 'react';
import {Remained} from './Remained';

type TabloPropsType = {
	counter: number
	maxNumber: number
	minNumber: number
	stepNumber: number
	isRemainedMax: boolean
	remainedMax: () => void
}

export const Tablo: React.FC<TabloPropsType> = (props) => {

	const text = props.counter === props.maxNumber
		? <span className='counter-tablo__text'>This is max value</span>
		: props.counter === props.minNumber ? <span className='counter-tablo__text'>This is min value</span> : null

	const remained = () => isRemainedMax && props.remainedMax()

	const isRemainedMax = props.isRemainedMax && <Remained text={`Add remainder ${props.maxNumber - props.counter}?`} button={'yes'} remained={remained}></Remained>

	return (
		<div className='counter-tablo tablo'>
			<span className={props.counter === props.maxNumber ? 'counter-tablo__number' + ' ' + 'counter-tablo__number--active' : 'counter-tablo__number'}>{props.counter}</span>
			{text}
			{isRemainedMax}
		</div>
	)
}