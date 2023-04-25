import React, {memo} from 'react';
import {CounterManagement} from './CounterManagement';
import {Tablo} from './Tablo';
import {Statistics} from './Statistics';

type CounterPropsType = {}

export const Counter: React.FC<CounterPropsType> = memo((props) => {
	return (
		<div className='counter'>
			<h2 className="title">Tablo</h2>
			<Statistics/>
			<Tablo/>
			<CounterManagement/>
		</div>
	)
})
