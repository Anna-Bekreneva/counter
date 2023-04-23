import React, {useCallback, useEffect, useState} from 'react';
import './styles/global.css';
import './styles/reset.css';
import './styles/counter.css';
import './styles/settings.css';
import './styles/statistics.css';
import {Counter} from './components/Counter/Counter';
import {Settings} from './components/Settings/Settings';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {setValueAC} from "./state/valuesReducer";
import {changeStatusStatisticsAC, clickDecreaseButtonAC, clickIncreaseButtonAC} from "./state/statisticsReducer";

export type ButtonCounterType = 'inc' | 'dec' | 'res'

function App () {
	const dispatch = useDispatch()

	const maxNumber = useSelector<AppRootStateType, number>(state => state.values.maxValue)
	const minNumber = useSelector<AppRootStateType, number>(state => state.values.minValue)
	const stepNumber = useSelector<AppRootStateType, number>(state => state.values.stepValue)
	const counter = useSelector<AppRootStateType, number>(state => state.values.counter)

	const isRunStatistics = useSelector<AppRootStateType, boolean>(state => state.statistics.isRunStatistics)
	const increaseButtonPressed = useSelector<AppRootStateType, number>(state => state.statistics.increaseButtonPressed)
	const decreaseButtonPressed = useSelector<AppRootStateType, number>(state => state.statistics.decreaseButtonPressed)
	// const [isRunStatistics, setIsRunStatistics] = useState(false)
	// const [increaseButtonPressed, setIncreaseButtonPressed] = useState(0)
	// const [decreaseButtonPressed, setDecreaseButtonPressed] = useState(0)

	const buttonCounterOnClickCallback = useCallback((type: ButtonCounterType) => {
		if (type === 'inc') {
			if (counter <= maxNumber - stepNumber && counter >= minNumber) {
				dispatch(setValueAC('counter', counter + stepNumber))
				localStorage.setItem('counter', (counter + stepNumber).toString())
				dispatch(clickIncreaseButtonAC())
				// setIncreaseButtonPressed((actual) => actual + 1)
				!isRunStatistics && dispatch(changeStatusStatisticsAC(true))
			}
		}

		if (type === 'dec') {
			counter > minNumber && dispatch(setValueAC('counter', minNumber - stepNumber))
			localStorage.setItem('counter', (minNumber - stepNumber).toString())
			dispatch(clickDecreaseButtonAC())
			!isRunStatistics && dispatch(changeStatusStatisticsAC(true))
		}

		if (type === 'res') {
			counter > minNumber + stepNumber && dispatch(setValueAC('counter', minNumber))
			localStorage.setItem('counter', minNumber.toString())
		}
	}, [counter, maxNumber, stepNumber, minNumber, isRunStatistics])

	const saveSettings = useCallback((max: number, min: number, step: number) => {
		dispatch(setValueAC('maxValue', max))
		dispatch(setValueAC('minValue', min))
		dispatch(setValueAC('stepValue', step))
		dispatch(setValueAC('counter', min))
		dispatch(changeStatusStatisticsAC(true))

		localStorage.setItem('maxValue', max.toString())
		localStorage.setItem('minValue', min.toString())
		localStorage.setItem('stepValue', step.toString())
		localStorage.setItem('counter', min.toString())
	}, [])

	useEffect(() => {
		const counterValue = localStorage.getItem('counter')
		if (counterValue) {
			dispatch(setValueAC('counter', Number(counterValue)))
		}

		return () => {}
	}, [])

	useEffect(() => {
		const maxValue = localStorage.getItem('maxValue')
		if (maxValue) {
			dispatch(setValueAC('maxValue', Number(maxValue)))
		}

		const minValue = localStorage.getItem('minValue')
		if (minValue) {
			dispatch(setValueAC('minValue', Number(minValue)))
		}

		const stepValue = localStorage.getItem('stepValue')
		if (stepValue) {
			dispatch(setValueAC('stepValue', Number(stepValue)))
		}

		return () => {}
	}, [])

	return (
		<div className='wrapper'>
			<div className='container'>
				<h1 className='heading'>Counter</h1>
				<div className='wrapper__container'>
					<Settings saveSettings={saveSettings}></Settings>
					<Counter buttonCounterOnClickCallback={buttonCounterOnClickCallback} isRunStatistics={isRunStatistics} incPressed={increaseButtonPressed} decPressed={decreaseButtonPressed}></Counter>
				</div>
			</div>
		</div>
	);
}

export default App;
