import React, {ChangeEvent, useState} from 'react';
import './styles/global.css';
import './styles/reset.css';
import './styles/counter.css';
import './styles/settings.css';
import {Counter} from './components/Counter/Counter';
import {Settings} from './components/Settings/Settings';

export type ButtonCounterType = 'inc' | 'dec' | 'res'
export type ButtonSettingsType = 'save' | 'default' | 'random'

function App () {

	const [maxNumber, setMaxNumber] = useState<number>(5)
	const [minNumber, setMinNumber] = useState<number>(0)

	const [counter, setCounter] = useState<number>(minNumber)

	const [maxNumberValue, setMaxNumberValue] = useState(maxNumber)
	const [minNumberValue, setMinNumberValue] = useState(minNumber)

	const changeMaxHandler = (event: ChangeEvent<HTMLInputElement>) => setMaxNumberValue(Number(event.currentTarget.value))
	const changeMinHandler = (event: ChangeEvent<HTMLInputElement>) => setMinNumberValue(Number(event.currentTarget.value))

	const setValues = (max: number, min: number) => {
		setMaxNumber(max)
		setMinNumber(min)
		setCounter(min)
	}

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

	const buttonSettingsOnClickCallback = (type: ButtonSettingsType, max: number, min: number) => {

	}

	return (
		<div className='wrapper'>
			<div className='container'>
				<h1 className='heading'>Counter</h1>
				<div className='wrapper__container'>
					<Settings buttonSettingsOnClickCallback={buttonSettingsOnClickCallback} maxNumber={maxNumber} minNumber={minNumber}></Settings>
					<Counter buttonCounterOnClickCallback={buttonCounterOnClickCallback} counter={counter} maxNumber={maxNumber} minNumber={minNumber}></Counter>
				</div>
			</div>
		</div>
	);
}

export default App;
