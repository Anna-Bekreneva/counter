import React, {memo, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';

type StaticsPropsType = {}

export const Statistics: React.FC<StaticsPropsType> = memo((props) => {

	const isRunStatistics = useSelector<AppRootStateType, boolean>(state => state.statistics.isRunStatistics)
	const increaseButtonPressed = useSelector<AppRootStateType, number>(state => state.statistics.increaseButtonPressed)
	const decreaseButtonPressed = useSelector<AppRootStateType, number>(state => state.statistics.decreaseButtonPressed)

	const maxNumber = useSelector<AppRootStateType, number>(state => state.values.maxValue)
	const minNumber = useSelector<AppRootStateType, number>(state => state.values.minValue)
	const stepNumber = useSelector<AppRootStateType, number>(state => state.values.stepValue)
	const counter = useSelector<AppRootStateType, number>(state => state.values.counter)

	const [statisticsMaxClick, setStatisticsMaxClick] = useState(Math.ceil((maxNumber - counter) / stepNumber))
	const [statisticsMinClick, setStatisticsMinClick] = useState(Math.ceil((counter - minNumber) / stepNumber))

	const [statisticsMaxNumber, setStatisticsMaxNumber] = useState(maxNumber - counter)
	const [statisticsMinNumber, setStatisticsMinNumber] = useState(counter - minNumber)

	useEffect(() => {
		setStatisticsMaxNumber(maxNumber - counter)
		setStatisticsMaxClick(Math.ceil((maxNumber - counter) / stepNumber))

		return () => {}
	}, [counter, maxNumber])

	useEffect(() => {
		setStatisticsMinNumber(counter - minNumber)
		setStatisticsMinClick(Math.ceil((counter - minNumber) / stepNumber))

		return () => {}
	}, [counter, minNumber])

	const result = isRunStatistics ?
		<>
			<div className="statistics__left">
				<p className='statistics__text'> up to the max number:
					<span className='statistics__accent'>{' ' + statisticsMaxNumber}</span> and
					<span className='statistics__accent'>{' ' + statisticsMaxClick}</span> click
				</p>
				<p className='statistics__text'> up to the min number:
					<span className='statistics__accent'>{' ' + statisticsMinNumber}</span> and
					<span className='statistics__accent'>{' ' + statisticsMinClick}</span> click
				</p>
			</div>
			<div className='statistics__right'>
				<p className='statistics__text'> the button «inc» was pressed:
					<span className='statistics__accent'>{' ' + increaseButtonPressed}</span>
				</p>
				<p className='statistics__text'> the button «dec» was pressed:
					<span className='statistics__accent'>{' ' + decreaseButtonPressed}</span>
				</p>
			</div>
		</>
		: <p className='statistics__default'>stats will be here</p>

	return  <div className='statistics tablo tablo--mini'>{result}</div>
})
