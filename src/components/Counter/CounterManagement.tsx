import React, {memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from "../../state/store";
import {setValueAC} from '../../state/valuesReducer';
import {changeStatusStatisticsAC, clickDecreaseButtonAC, clickIncreaseButtonAC} from '../../state/statisticsReducer';

type ManagementPropsType = {}

export const CounterManagement: React.FC<ManagementPropsType> = memo((props) => {

	const dispatch = useDispatch()
	const maxNumber = useSelector<AppRootStateType, number>(state => state.values.maxValue)
	const minNumber = useSelector<AppRootStateType, number>(state => state.values.minValue)
	const stepNumber = useSelector<AppRootStateType, number>(state => state.values.stepValue)
	const counter = useSelector<AppRootStateType, number>(state => state.values.counter)

	const isRunStatistics = useSelector<AppRootStateType, boolean>(state => state.statistics.isRunStatistics)

	const incOnClickHandler = () => {
		if (counter <= maxNumber - stepNumber && counter >= minNumber) {
			dispatch(setValueAC('counter', counter + stepNumber))
			dispatch(clickIncreaseButtonAC())
			!isRunStatistics && dispatch(changeStatusStatisticsAC(true))
		}
	}

	const decOnClickHandler = () => {
		counter > minNumber && dispatch(setValueAC('counter', counter - stepNumber))
		dispatch(clickDecreaseButtonAC())
		!isRunStatistics && dispatch(changeStatusStatisticsAC(true))
	}

	const resOnClickHandler = () => {
		dispatch(setValueAC('counter', minNumber))
	}

	const disabledInc = counter + stepNumber > maxNumber || counter === maxNumber
	const disabledDec = counter - stepNumber < minNumber || counter === minNumber
	const disabledRes = counter - stepNumber === minNumber || counter === minNumber

	return (
		<div className='management'>
			<button className='management__button button' type='button' onClick={incOnClickHandler} disabled={disabledInc}>inc</button>
			<button className='management__button button' type='button' onClick={decOnClickHandler} disabled={disabledDec}>dec</button>
			<button className='management__button button' type='button' onClick={resOnClickHandler} disabled={disabledRes}>res</button>
		</div>
	)
})
