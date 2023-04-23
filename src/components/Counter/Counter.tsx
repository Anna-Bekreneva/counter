import React, {memo, useEffect, useState} from 'react';
import {CounterManagement} from './CounterManagement';
import {Tablo} from './Tablo';
import {ButtonCounterType} from '../../App';
import {Statistics} from './Statistics';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";

type CounterPropsType = {
	isRunStatistics: boolean
	incPressed: number
	decPressed: number
	buttonCounterOnClickCallback: (type: ButtonCounterType) => void
}

export const Counter: React.FC<CounterPropsType> = memo((props) => {

	const maxNumber = useSelector<AppRootStateType, number>(state => state.values.maxValue)
	const minNumber = useSelector<AppRootStateType, number>(state => state.values.minValue)
	const stepNumber = useSelector<AppRootStateType, number>(state => state.values.stepValue)
	const counter = useSelector<AppRootStateType, number>(state => state.values.counter)

	const [statisticsMaxClick, setStatisticsMaxClick] = useState(Math.ceil((maxNumber - counter) / stepNumber))
	const [statisticsMinClick, setStatisticsMinClick] = useState(Math.ceil((counter - minNumber) / stepNumber))

	const [statisticsMaxNumber, setStatisticsMaxNumber] = useState(maxNumber - counter)
	const [statisticsMinNumber, setStatisticsMinNumber] = useState(counter - minNumber)

	useEffect(() => {
		setStatisticsMaxNumber(maxNumber - counter)
		setStatisticsMaxClick(Math.ceil((maxNumber - counter) / stepNumber))

		return () => {}
	}, [counter, maxNumber])

	useEffect(() => {
		setStatisticsMinNumber(counter - minNumber)
		setStatisticsMinClick(Math.ceil((counter - minNumber) / stepNumber))

		return () => {}
	}, [counter, minNumber])

	return (
		<div className='counter'>
			<h2 className="title">Tablo</h2>
			<Statistics maxNumber={statisticsMaxNumber} maxClick={statisticsMaxClick} minNumber={statisticsMinNumber} minClick={statisticsMinClick} isRunStatistics={props.isRunStatistics} incPressed={props.incPressed} decPressed={props.decPressed}/>
			<Tablo/>
			<CounterManagement buttonCounterOnClickCallback={props.buttonCounterOnClickCallback}></CounterManagement>
		</div>
	)
})