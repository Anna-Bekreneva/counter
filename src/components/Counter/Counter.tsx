import React, {memo} from 'react';
import {CounterManagement} from './CounterManagement';
import {Tablo} from './Tablo';
import {ButtonCounterType} from '../../App';
import {Statistics} from './Statistics';

type CounterPropsType = {
	buttonCounterOnClickCallback: (type: ButtonCounterType) => void
}

export const Counter: React.FC<CounterPropsType> = memo((props) => {
	return (
		<div className='counter'>
			<h2 className="title">Tablo</h2>
			<Statistics/>
			<Tablo/>
			<CounterManagement buttonCounterOnClickCallback={props.buttonCounterOnClickCallback}></CounterManagement>
		</div>
	)
})
