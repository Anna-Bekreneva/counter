import React, {useEffect, useState} from 'react';
import {CounterManagement} from './CounterManagement';
import {Tablo} from './Tablo';
import {ButtonCounterType} from '../../App';
import {Statistics} from './Statistics';

type CounterPropsType = {
	counter: number
	maxNumber: number
	minNumber: number
	stepNumber: number
	isRemainedMax: boolean
	remainedMax: () => void
	isRunStatistics: boolean
	incPressed: number
	decPressed: number
	buttonCounterOnClickCallback: (type: ButtonCounterType) => void
}

export const Counter: React.FC<CounterPropsType> = (props) => {

	const [statisticsMaxClick, setStatisticsMaxClick] = useState(Math.ceil((props.maxNumber - props.counter) / props.stepNumber))
	const [statisticsMinClick, setStatisticsMinClick] = useState(Math.ceil((props.counter - props.minNumber) / props.stepNumber))

	const [statisticsMaxNumber, setStatisticsMaxNumber] = useState(props.maxNumber - props.counter)
	const [statisticsMinNumber, setStatisticsMinNumber] = useState(props.counter - props.minNumber)

	useEffect(() => {
		setStatisticsMaxNumber(props.maxNumber - props.counter)
		setStatisticsMaxClick(Math.ceil((props.maxNumber - props.counter) / props.stepNumber))
	}, [props.counter, props.maxNumber])

	useEffect(() => {
		setStatisticsMinNumber(props.counter - props.minNumber)
		setStatisticsMinClick(Math.ceil((props.counter - props.minNumber) / props.stepNumber))
	}, [props.counter, props.minNumber])

	return (
		<div className='counter'>
			<h2 className="title">Tablo</h2>
			<Statistics maxNumber={statisticsMaxNumber} maxClick={statisticsMaxClick} minNumber={statisticsMinNumber} minClick={statisticsMinClick} isRunStatistics={props.isRunStatistics} incPressed={props.incPressed} decPressed={props.decPressed}/>
			<Tablo counter={props.counter} maxNumber={props.maxNumber} minNumber={props.minNumber} stepNumber={props.stepNumber} isRemainedMax={props.isRemainedMax} remainedMax={props.remainedMax}></Tablo>
			<CounterManagement counter={props.counter} maxNumber={props.maxNumber} minNumber={props.minNumber} stepNumber={props.stepNumber} buttonCounterOnClickCallback={props.buttonCounterOnClickCallback}></CounterManagement>
		</div>
	)
}