import React, {useState} from 'react';
import {Tablo} from './Tablo';
import {Management} from './Management';

export type CounterType = 0 | 1 | 2 | 3 | 4 | 5
export const MIN_VALUE = 0
export const MAX_VALUE = 5

export const Counter = () => {

	const [counter, setCounter] = useState<CounterType>(0)

	const incCounter = () => {

	}

	const decCounter = () => {

	}

	const resetCounter = () => {

	}

	return (
		<div className={'counter'}>
			<Tablo counter={counter}></Tablo>
			<Management></Management>
		</div>
	)
}