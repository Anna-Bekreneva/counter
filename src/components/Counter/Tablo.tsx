import React, {memo, useCallback} from 'react';
import {Remained} from './Remained';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {setValueAC} from "../../state/valuesReducer";

type TabloPropsType = {}

export const Tablo: React.FC<TabloPropsType> = memo((props) => {
	const dispatch = useDispatch()
	const maxNumber = useSelector<AppRootStateType, number>(state => state.values.maxValue)
	const minNumber = useSelector<AppRootStateType, number>(state => state.values.minValue)
	const counter = useSelector<AppRootStateType, number>(state => state.values.counter)
	const stepNumber = useSelector<AppRootStateType, number>(state => state.values.stepValue)

	const isRemainedMax = counter !== maxNumber && counter + stepNumber > maxNumber
	const remainedMax = useCallback(() => dispatch(setValueAC('counter', maxNumber)), [maxNumber])

	const text = counter === maxNumber
		? <span className='counter-tablo__text'>This is max value</span>
		: counter === minNumber ? <span className='counter-tablo__text'>This is min value</span> : null

	const remained = useCallback(() => isRemainedMax && remainedMax(), [remainedMax, isRemainedMax])

	const isRemainedMaxLayout = isRemainedMax &&
		<Remained text={`Add remainder ${maxNumber - counter}?`} button={'yes'} remained={remained}></Remained>

	return (
		<div className='counter-tablo tablo'>
			<span className={counter === maxNumber ? 'counter-tablo__number' + ' ' + 'counter-tablo__number--active' : 'counter-tablo__number'}>{counter}</span>
			{text}
			{isRemainedMaxLayout}
		</div>
	)
})