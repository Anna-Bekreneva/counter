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

	const [maxNumber, setMaxNumber] = useState(DEFAULT_MAX)
	const [minNumber, setMinNumber] = useState(DEFAULT_MIN)

	const [counter, setCounter] = useState(minNumber)

	const buttonCounterOnClickCallback = (type: ButtonCounterType) => {
		if (type === 'inc') {
			if(counter <= maxNumber - 1 && counter >= minNumber) {
				setCounter(counter + 1)
			}
		}

		if (type === 'dec') {
			counter > minNumber && setCounter(counter - 1)
		}

		if (type === 'res') {
			counter > minNumber + 1 && setCounter(minNumber)
		}
	}

	const saveSettings = (max: number, min: number) => {
		setMaxNumber(max)
		setMinNumber(min)
		setCounter(min)
	}

	const defaultSettings = () => setCounter(DEFAULT_MIN)

	return (
		<div className='wrapper'>
			<div className='container'>
				<h1 className='heading'>Counter</h1>
				<div className='wrapper__container'>
					<Settings saveSettings={saveSettings} defaultSettings={defaultSettings} maxNumber={maxNumber} minNumber={minNumber} DEFAULT_MAX={DEFAULT_MAX} DEFAULT_MIN={DEFAULT_MIN}></Settings>
					<Counter buttonCounterOnClickCallback={buttonCounterOnClickCallback} counter={counter} maxNumber={maxNumber} minNumber={minNumber}></Counter>
				</div>
			</div>
		</div>
	);
}

export default App;
