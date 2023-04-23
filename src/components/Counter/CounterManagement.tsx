import React, {memo} from 'react';
import {ButtonCounterType} from '../../App';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";

type ManagementPropsType = {
	buttonCounterOnClickCallback: (type: ButtonCounterType) => void
}

export const CounterManagement: React.FC<ManagementPropsType> = memo((props) => {

	const maxNumber = useSelector<AppRootStateType, number>(state => state.values.maxValue)
	const minNumber = useSelector<AppRootStateType, number>(state => state.values.minValue)
	const stepNumber = useSelector<AppRootStateType, number>(state => state.values.stepValue)
	const counter = useSelector<AppRootStateType, number>(state => state.values.counter)

	const onClickHandler = (type: ButtonCounterType) => () => props.buttonCounterOnClickCallback(type)

	const disabledInc = counter + stepNumber > maxNumber || counter === maxNumber
	const disabledDec = counter - stepNumber < minNumber || counter === minNumber
	const disabledRes = counter - stepNumber === minNumber || counter === minNumber

	return (
		<div className='management'>
			<button className='management__button button' type='button' onClick={onClickHandler('inc')} disabled={disabledInc}>inc</button>
			<button className='management__button button' type='button' onClick={onClickHandler('dec')} disabled={disabledDec}>dec</button>
			<button className='management__button button' type='button' onClick={onClickHandler('res')} disabled={disabledRes}>res</button>
		</div>
	)
})