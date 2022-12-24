import React, {useState} from 'react';
import './styles/global.css';
import './styles/reset.css';
import './styles/counter.css';
import './styles/settings.css';
import {Counter} from './components/Counter/Counter';
import {Settings} from './components/Settings/Settings';

export type ButtonCounterType = 'inc' | 'dec' | 'res'

function App () {

	const DEFAULT_MAX = 5
	const DEFAULT_MIN = 0
	const DEFAULT_STEP = 1

	const LIMIT = 30
	const LIMIT_STEP = LIMIT - DEFAULT_STEP

	const [maxNumber, setMaxNumber] = useState(DEFAULT_MAX)
	const [minNumber, setMinNumber] = useState(DEFAULT_MIN)
	const [stepNumber, setStepNumber] = useState(DEFAULT_STEP)

	const [counter, setCounter] = useState(minNumber)

	const isRemainedMax = counter !== maxNumber && counter + stepNumber > maxNumber

	const remainedMax = () => setCounter(maxNumber)

	const buttonCounterOnClickCallback = (type: ButtonCounterType) => {
		if (type === 'inc') {
			if (counter <= maxNumber - stepNumber && counter >= minNumber) {
				setCounter(counter + stepNumber)
			}
		}

		if (type === 'dec') {
			counter > minNumber && setCounter(counter - stepNumber)
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
	}

	const defaultSettings = () => {
		setCounter(DEFAULT_MIN);
		setStepNumber(DEFAULT_STEP)
	}

	return (
		<div className='wrapper'>
			<div className='container'>
				<h1 className='heading'>Counter</h1>
				<div className='wrapper__container'>
					<Settings saveSettings={saveSettings} defaultSettings={defaultSettings} maxNumber={maxNumber} minNumber={minNumber} stepNumber={stepNumber} DEFAULT_MAX={DEFAULT_MAX} DEFAULT_MIN={DEFAULT_MIN} DEFAULT_STEP={DEFAULT_STEP} LIMIT={LIMIT}></Settings>
					<Counter buttonCounterOnClickCallback={buttonCounterOnClickCallback} counter={counter} maxNumber={maxNumber} minNumber={minNumber} stepNumber={stepNumber} isRemainedMax={isRemainedMax} remainedMax={remainedMax}></Counter>
				</div>
			</div>
		</div>
	);
}

export default App;
