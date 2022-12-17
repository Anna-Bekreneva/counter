import React from 'react';
import {CounterType} from './Counter';

type TabloPropsType = {
	counter: CounterType
}

export const Tablo: React.FC<TabloPropsType> = (props) => {
	return (
		<div>{props.counter}</div>
	)
}