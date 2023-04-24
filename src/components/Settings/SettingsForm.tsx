import React, {ChangeEvent, KeyboardEvent, LegacyRef, useCallback, useEffect, useState} from 'react';
import {SettingsManagement} from './SettingsManagement';
import {SettingsItem} from './SettingsItem';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from "../../state/store";
import {
	errorMessageGreaterMax,
	errorMessageGreaterMaxForStep,
	errorMessageGreaterStep,
	errorMessageLength,
	errorMessageLessMin,
	notificationCan,
	notificationDefault,
	notificationForget,
	notificationRandom,
	notificationSave,
	warningMessage
} from "../../utilities";
import {decreaseValueAC, increaseValueAC, setValueAC} from '../../state/valuesReducer';
import {changeStatusStatisticsAC} from '../../state/statisticsReducer';

type SettingsFormPropsType = {
	notificationText: string
	callbackForNotification: (text: string) => void
	saveSettings: (max: number, min: number, step: number) => void
}

export const SettingsForm: React.FC<SettingsFormPropsType> = (props) => {

	const dispatch = useDispatch()
	const DEFAULT_MIN = useSelector<AppRootStateType, number>(state => state.values.defaultMin)
	const DEFAULT_MAX = useSelector<AppRootStateType, number>(state => state.values.defaultMax)
	const DEFAULT_STEP = useSelector<AppRootStateType, number>(state => state.values.defaultStep)
	const LIMIT_VALUE = useSelector<AppRootStateType, number>(state => state.values.limitValue)

	const maxNumber = useSelector<AppRootStateType, number>(state => state.values.maxValue)
	const minNumber = useSelector<AppRootStateType, number>(state => state.values.minValue)
	const stepNumber = useSelector<AppRootStateType, number>(state => state.values.stepValue)

	console.log(maxNumber, minNumber)

	const [warning, setWarning] = useState('')

	const [errorMax, setErrorMax] = useState('');
	const [errorMin, setErrorMin] = useState('');
	const [errorStep, setErrorStep] = useState('');

	const maxRef: LegacyRef<HTMLInputElement> | undefined = React.createRef()
	const minRef: LegacyRef<HTMLInputElement> | undefined = React.createRef()
	const stepRef: LegacyRef<HTMLInputElement> | undefined = React.createRef()

	const [maxButtonDopClass, setMaxButtonDopClass] = useState('')
	const [minButtonDopClass, setMinButtonDopClass] = useState('')
	const [stepButtonDopClass, setStepButtonDopClass] = useState('')
	const [whichButtonMaxDopClass, setWhichButtonMaxDopClass] = useState<'plus' | 'minus' | null>(null)
	const [whichButtonMinDopClass, setWhichButtonMinDopClass] = useState<'plus' | 'minus' | null>(null)
	const [whichButtonStepDopClass, setWhichButtonStepDopClass] = useState<'plus' | 'minus' | null>(null)

	const [saveDisabled, setSaveDisabled] = useState(true)
	const [defaultDisabled, setDefaultDisabled] = useState(true)

	const resetButtonDopClass = useCallback(() => {
		setMaxButtonDopClass('')
		setMinButtonDopClass('')
		setStepButtonDopClass('')

		setWhichButtonMaxDopClass(null)
		setWhichButtonMinDopClass(null)
		setWhichButtonStepDopClass(null)
	}, [])

	// OnKeyDown
	const allOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		const symbolsForExcept = [',', '-', '+', '.'];
		symbolsForExcept.includes(event.key) && event.preventDefault();
	}

	const maxOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		allOnKeyDownHandler(event)
		// down - 40, up - 38

		if ((maxNumber !== DEFAULT_STEP && event.keyCode === 40) || (maxNumber !== LIMIT_VALUE && event.keyCode === 38)) {
			setMaxButtonDopClass('settings__button--active')
		} else {
			resetButtonDopClass()
		}

		if ((maxNumber === DEFAULT_STEP && event.keyCode === 40) || (maxNumber === LIMIT_VALUE && event.keyCode === 38)) {
			event.preventDefault()
		}

		if (maxNumber === LIMIT_VALUE - 1 || maxNumber === DEFAULT_STEP + 1) {
			resetButtonDopClass()
		}

		if (event.keyCode === 38) {
			setWhichButtonMaxDopClass('plus')
		}

		if (event.keyCode === 40) {
			setWhichButtonMaxDopClass('minus')
		}
	};

	const minOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		allOnKeyDownHandler(event)

		// down - 40, up - 38

		if ((minNumber === DEFAULT_MIN && event.keyCode === 40) || (minNumber === LIMIT_VALUE && event.keyCode === 38)) {
			event.preventDefault()
		}

		if ((minNumber !== DEFAULT_MIN && event.keyCode === 40) || (minNumber !== LIMIT_VALUE && event.keyCode === 38)) {
			setMinButtonDopClass('settings__button--active')
		} else {
			resetButtonDopClass()
		}

		if (minNumber === LIMIT_VALUE + 1 || minNumber === DEFAULT_MIN + 1) {
			resetButtonDopClass()
		}

		if (event.keyCode === 38) {
			setWhichButtonMinDopClass('plus')
		}

		if (event.keyCode === 40) {
			setWhichButtonMinDopClass('minus')
		}
	};

	const stepOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		allOnKeyDownHandler(event)

		// down - 40, up - 38
		if (stepNumber === DEFAULT_STEP && event.keyCode === 40) {
			event.preventDefault()
		}

		if ((stepNumber === DEFAULT_MIN && event.keyCode === 40) || (event.keyCode === 38 && stepNumber === LIMIT_VALUE)) {
			event.preventDefault()
		}

		if ((event.keyCode === 40 && stepNumber > DEFAULT_MIN + 2) || (event.keyCode === 38 && stepNumber !== LIMIT_VALUE)) {
			setStepButtonDopClass('settings__button--active')
		} else {
			resetButtonDopClass()
		}

		if (event.keyCode === 38) {
			setWhichButtonStepDopClass('plus')
		}

		if (event.keyCode === 40) {
			setWhichButtonStepDopClass('minus')
		}
	};

	// PlusOnClick
	const maxPlusOnClickHandler = useCallback(() => {
		dispatch(increaseValueAC('maxValue', 1))
		maxRef.current && maxRef.current.focus()
	}, [maxRef])

	const minPlusOnClickHandler = useCallback(() => {
		dispatch(increaseValueAC('minValue', 1))
		minRef.current && minRef.current.focus()
	}, [minRef])

	const stepPlusOnClickHandler = useCallback(() => {
		dispatch(increaseValueAC('stepValue', 1))
		stepRef.current && stepRef.current.focus()
	}, [stepRef])

	const maxMinusButtonDisabled = maxNumber < DEFAULT_MIN + DEFAULT_STEP + DEFAULT_STEP
	const maxPLusButtonDisabled = maxNumber === LIMIT_VALUE

	const minMinusButtonDisabled = minNumber === DEFAULT_MIN
	const minPLusButtonDisabled = minNumber === LIMIT_VALUE

	const stepMinusButtonDisabled = stepNumber === DEFAULT_MIN + 1
	const stepPLusButtonDisabled = stepNumber === LIMIT_VALUE - 1

	// MinusOnClick
	const maxMinusOnClickHandler = useCallback(() => {
		dispatch(decreaseValueAC('maxValue', 1))
		maxRef.current && maxRef.current.focus()
	}, [maxMinusButtonDisabled, maxRef])

	const minMinusOnClickHandler = useCallback(() => {
		dispatch(decreaseValueAC('minValue', 1))
		minRef.current && minRef.current.focus()
	}, [minMinusButtonDisabled, minRef])

	const stepMinusOnClickHandler = useCallback(() => {
		dispatch(decreaseValueAC('stepValue', 1))
		stepRef.current && stepRef.current.focus()
	}, [stepMinusButtonDisabled, stepRef])

	useEffect(() => {
		errorMax && setErrorMax('')
		errorStep && setErrorStep('')
		errorMin && setErrorMin('')
		warning && setWarning('')

		dispatch(changeStatusStatisticsAC(false))

		if (((maxNumber - minNumber) % stepNumber !== 0) && (maxNumber >= stepNumber) && minNumber < maxNumber) {
			setWarning(warningMessage)
		}

		if (maxNumber < stepNumber) {
			setErrorMax(errorMessageGreaterMaxForStep)
			setErrorStep(errorMessageGreaterStep)
		}

		if (minNumber >= maxNumber) {
			setErrorMin(errorMessageLessMin)
			setErrorMax(errorMessageGreaterMax)
		}

		if (minNumber === DEFAULT_MIN && maxNumber === DEFAULT_MAX && stepNumber === DEFAULT_STEP) {
			setDefaultDisabled(true)
		} else if (minNumber !== DEFAULT_MIN || maxNumber !== DEFAULT_MAX || stepNumber !== DEFAULT_STEP) {
			setDefaultDisabled(false)
		}

		return () => {}
	}, [minNumber, maxNumber, stepNumber])

	useEffect(() => {
		if ((maxNumber === maxNumber && minNumber === minNumber && stepNumber === stepNumber) || (maxNumber < stepNumber || minNumber >= maxNumber)) {
			setSaveDisabled(true)
			props.notificationText === notificationForget && props.callbackForNotification(notificationCan)

		} else if ((maxNumber !== maxNumber || minNumber !== minNumber || stepNumber !== stepNumber) || (maxNumber >= stepNumber || minNumber < maxNumber)) {
			setSaveDisabled(false)
			props.callbackForNotification(notificationForget)
		}

		return () => {}
	}, [maxNumber, minNumber, stepNumber])

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value = event.currentTarget.value.replace(/^0/, '');
	}

	// OnChange
	const maxOnChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		onChangeHandler(event)

		if (Number(event.currentTarget.value) > LIMIT_VALUE) {
			setErrorMax(errorMessageLength)

			if (Array.from(event.currentTarget.value).length <= String(LIMIT_VALUE).split("").length) {
				dispatch(setValueAC('maxValue', Number(event.currentTarget.value)))
			}
		} else {
			dispatch(setValueAC('maxValue', Number(event.currentTarget.value)))
		}
	}, [onChangeHandler, LIMIT_VALUE])

	const minOnChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		onChangeHandler(event)

		if (Number(event.currentTarget.value) > LIMIT_VALUE) {
			setErrorMin(errorMessageLength)

			if (Array.from(event.currentTarget.value).length <= String(LIMIT_VALUE).split("").length) {
				dispatch(setValueAC('minValue', Number(event.currentTarget.value)))
			}
		} else {
			dispatch(setValueAC('minValue', Number(event.currentTarget.value)))
		}
	}, [onChangeHandler, LIMIT_VALUE])

	const stepOnChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		onChangeHandler(event)

		if (event.currentTarget.value.length > 3) {
			dispatch(setValueAC('stepValue', stepNumber))
		} else {
			dispatch(setValueAC('stepValue', Number(event.currentTarget.value)))
		}
	}, [onChangeHandler])

	// Settings
	const saveSettings = useCallback(() => {
		props.saveSettings(maxNumber, minNumber, stepNumber);
		props.callbackForNotification(notificationSave)
	}, [maxNumber, minNumber, stepNumber, notificationSave, props.saveSettings, props.callbackForNotification])

	const resetError = () => {
		errorMax && setErrorMax('');
		errorMin && setErrorMin('');
		errorStep && setErrorStep('');
	};

	const defaultSettings = useCallback(() => {
		dispatch(setValueAC('maxValue', DEFAULT_MAX))
		dispatch(setValueAC('minValue', DEFAULT_MIN))
		dispatch(setValueAC('stepValue', DEFAULT_STEP))
		props.saveSettings(DEFAULT_MAX, DEFAULT_MIN, DEFAULT_STEP);
		props.callbackForNotification(notificationDefault);
		resetError();
	}, [DEFAULT_MAX, DEFAULT_MIN, DEFAULT_STEP, notificationDefault, props.saveSettings, props.callbackForNotification, resetError])

	const randomSettings = useCallback(() => {
		const randomMax = Math.floor(Math.random() * ( LIMIT_VALUE - stepNumber )) + stepNumber;
		const randomMin = Math.floor(Math.random() * ( randomMax - stepNumber ));

		let randomStep = 0;
		do {
			randomStep = Math.floor(Math.random() * randomMax) + 1;
		} while (( randomMax - randomMin ) % randomStep !== 0);

		dispatch(setValueAC('maxValue', randomMax))
		dispatch(setValueAC('minValue', randomMin))
		dispatch(setValueAC('stepValue', randomStep))
		resetError();
		props.saveSettings(randomMax, randomMin, randomStep);
		props.callbackForNotification(notificationRandom);
	}, [LIMIT_VALUE, stepNumber, stepNumber, resetError, props.saveSettings, props.callbackForNotification])

	return (
		<form className="settings__form" action={'#'}>
			<div className="tablo">
				<div className="settings__items">
					<SettingsItem
						labelText={"Enter max value"}
						inputId={"max"}
						error={errorMax}
						newValue={maxNumber}
						changeHandler={maxOnChangeHandler}
						onKeyDown={maxOnKeyDownHandler}
						link={maxRef}
						resetButtonDopClass={resetButtonDopClass}
						whichButtonDopClass={whichButtonMaxDopClass}
						buttonDopClass={maxButtonDopClass}
						minusOnClick={maxMinusOnClickHandler}
						minusButtonDisabled={maxMinusButtonDisabled}
						plusOnClick={maxPlusOnClickHandler}
						maxButtonDisabled={maxPLusButtonDisabled}
						valueForInput={maxNumber ? maxNumber : 1}
					/>
					<SettingsItem
						labelText={"Enter min value"}
						inputId={"min"}
						error={errorMin}
						newValue={minNumber}
						changeHandler={minOnChangeHandler}
						onKeyDown={minOnKeyDownHandler}
						link={minRef}
						resetButtonDopClass={resetButtonDopClass}
						whichButtonDopClass={whichButtonMinDopClass}
						buttonDopClass={minButtonDopClass}
						minusOnClick={minMinusOnClickHandler}
						minusButtonDisabled={minMinusButtonDisabled}
						plusOnClick={minPlusOnClickHandler}
						maxButtonDisabled={minPLusButtonDisabled}
						valueForInput={minNumber}
					/>
					<SettingsItem
						labelText={"Enter step"}
						inputId={"step"}
						error={errorStep}
						newValue={stepNumber}
						changeHandler={stepOnChangeHandler}
						onKeyDown={stepOnKeyDownHandler}
						link={stepRef}
						resetButtonDopClass={resetButtonDopClass}
						whichButtonDopClass={whichButtonStepDopClass}
						buttonDopClass={stepButtonDopClass}
						minusOnClick={stepMinusOnClickHandler}
						minusButtonDisabled={stepMinusButtonDisabled}
						plusOnClick={stepPlusOnClickHandler}
						maxButtonDisabled={stepPLusButtonDisabled}
						valueForInput={stepNumber}
						warning={warning}
					/>
				</div>
			</div>
			<SettingsManagement saveSettings={saveSettings} defaultSettings={defaultSettings} randomSettings={randomSettings} saveDisabled={saveDisabled} defaultDisabled={defaultDisabled}></SettingsManagement>
		</form>
	);
};
