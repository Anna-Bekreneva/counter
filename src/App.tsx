import React, {useCallback, useEffect, useState} from 'react';
import './styles/global.css';
import './styles/reset.css';
import './styles/counter.css';
import './styles/settings.css';
import './styles/statistics.css';
import {Counter} from './components/Counter/Counter';
import {Settings} from './components/Settings/Settings';

export type ButtonCounterType = 'inc' | 'dec' | 'res'

function App () {

	const DEFAULT_MAX = 5
	const DEFAULT_MIN = 0
	const DEFAULT_STEP = 1
	const LIMIT_VALUE = 300

	const [maxNumber, setMaxNumber] = useState(DEFAULT_MAX)
	const [minNumber, setMinNumber] = useState(DEFAULT_MIN)
	const [stepNumber, setStepNumber] = useState(DEFAULT_STEP)

	const [counter, setCounter] = useState(minNumber)

	const [isRunStatistics, setIsRunStatistics] = useState(false)

	const [incPressed, setIncPressed] = useState(0)
	const [decPressed, setDecPressed] = useState(0)

	const isRemainedMax = counter !== maxNumber && counter + stepNumber > maxNumber

	const remainedMax = useCallback(() => setCounter(maxNumber), [maxNumber])

	const buttonCounterOnClickCallback = useCallback((type: ButtonCounterType) => {
		if (type === 'inc') {
			if (counter <= maxNumber - stepNumber && counter >= minNumber) {
				setCounter((actual) => actual + stepNumber)
				const newCounter = ((actual: number) => actual + stepNumber)
				const resultCounter = newCounter(counter)
				localStorage.setItem('counter', resultCounter.toString())
				setIncPressed((actual) => actual + 1)
				!isRunStatistics && setIsRunStatistics(true)
			}
		}

		if (type === 'dec') {
			counter > minNumber && setCounter((actual) => actual - stepNumber)
			const newCounter = ((actual: number) => actual - stepNumber)
			const resultCounter = newCounter(counter)
			localStorage.setItem('counter', resultCounter.toString())
			setDecPressed((actual) => actual + 1)
			!isRunStatistics && setIsRunStatistics(true)
		}

		if (type === 'res') {
			counter > minNumber + stepNumber && setCounter(minNumber)
			localStorage.setItem('counter', minNumber.toString())
		}
	}, [counter, maxNumber, stepNumber, minNumber, isRunStatistics])

	const saveSettings = useCallback((max: number, min: number, step: number) => {
		setMaxNumber(max)
		setMinNumber(min)
		setStepNumber(step)
		setCounter(min)
		setIsRunStatistics(true)

		localStorage.setItem('maxValue', max.toString())
		localStorage.setItem('minValue', min.toString())
		localStorage.setItem('stepValue', step.toString())
		localStorage.setItem('counter', min.toString())
	}, [])

	useEffect(() => {
		const counterValue = localStorage.getItem('counter')
		console.log(counterValue)
		if (counterValue) {
			setCounter(Number(counterValue))
		}

		return () => {}
	}, [])

	useEffect(() => {
		const maxValue = localStorage.getItem('maxValue')
		if (maxValue) {
			setMaxNumber(Number(maxValue))
		}

		const minValue = localStorage.getItem('minValue')
		if (minValue) {
			setMinNumber(Number(minValue))
			// setCounter(Number(minValue))
		}

		const stepValue = localStorage.getItem('stepValue')
		if (stepValue) {
			setStepNumber(Number(stepValue))
		}

		return () => {}
	}, [])

	return (
		<div className='wrapper'>
			<div className='container'>
				<h1 className='heading'>Counter</h1>
				<div className='wrapper__container'>
					<Settings saveSettings={saveSettings} maxNumber={maxNumber} minNumber={minNumber} stepNumber={stepNumber} DEFAULT_MAX={DEFAULT_MAX} DEFAULT_MIN={DEFAULT_MIN} DEFAULT_STEP={DEFAULT_STEP} LIMIT_VALUE={LIMIT_VALUE}></Settings>
					<Counter buttonCounterOnClickCallback={buttonCounterOnClickCallback} counter={counter} maxNumber={maxNumber} minNumber={minNumber} stepNumber={stepNumber} isRemainedMax={isRemainedMax} remainedMax={remainedMax} isRunStatistics={isRunStatistics} incPressed={incPressed} decPressed={decPressed}></Counter>
				</div>
			</div>
		</div>
	);
}

export default App;
