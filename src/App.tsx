import React, {useEffect, useState} from 'react';
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

	const remainedMax = () => setCounter(maxNumber)

	const buttonCounterOnClickCallback = (type: ButtonCounterType) => {
		if (type === 'inc') {
			if (counter <= maxNumber - stepNumber && counter >= minNumber) {
				setCounter((actual) => actual + stepNumber)
				setIncPressed((actual) => actual + 1)
				!isRunStatistics && setIsRunStatistics(true)
			}
		}

		if (type === 'dec') {
			counter > minNumber && setCounter((actual) => actual - stepNumber)
			setDecPressed((actual) => actual + 1)
			!isRunStatistics && setIsRunStatistics(true)
		}

		if (type === 'res') {
			counter > minNumber + stepNumber && setCounter(minNumber)
		}
	}

	const saveSettings = (max: number, min: number, step: number) => {
		setMaxNumber(max)
		setMinNumber(min)
		setStepNumber(step)
		setCounter(min)
		setIsRunStatistics(true)
	}

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
