import React, {ChangeEvent, KeyboardEvent, LegacyRef, useCallback, useEffect, useState} from 'react';
import {SettingsManagement} from './SettingsManagement';
import {SettingsItem} from './SettingsItem';
import {useSelector} from "react-redux";
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

type SettingsFormPropsType = {
	notificationText: string
	callbackForNotification: (text: string) => void
	saveSettings: (max: number, min: number, step: number) => void
}

export const SettingsForm: React.FC<SettingsFormPropsType> = (props) => {

	const DEFAULT_MIN = useSelector<AppRootStateType, number>(state => state.values.defaultMin)
	const DEFAULT_MAX = useSelector<AppRootStateType, number>(state => state.values.defaultMax)
	const DEFAULT_STEP = useSelector<AppRootStateType, number>(state => state.values.defaultStep)
	const LIMIT_VALUE = useSelector<AppRootStateType, number>(state => state.values.limitValue)

	const maxNumber = useSelector<AppRootStateType, number>(state => state.values.maxValue)
	const minNumber = useSelector<AppRootStateType, number>(state => state.values.minValue)
	const stepNumber = useSelector<AppRootStateType, number>(state => state.values.stepValue)

	const [newMaxValue, setNewMaxValue] = useState(maxNumber);
	const [newMinValue, setNewMinValue] = useState(minNumber);
	const [newStepValue, setNewStepValue] = useState(stepNumber);

	// For localStorage
	useEffect(() => {
		setNewMaxValue(maxNumber)
		return () => {}
	}, [maxNumber])

	useEffect(() => {
		setNewMinValue(minNumber)
		return () => {}
	}, [minNumber])

	useEffect(() => {
		setNewStepValue(stepNumber)
		return () => {}
	}, [stepNumber])

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

		if ((newMaxValue !== DEFAULT_STEP && event.keyCode === 40) || (newMaxValue !== LIMIT_VALUE && event.keyCode === 38)) {
			setMaxButtonDopClass('settings__button--active')
		} else {
			resetButtonDopClass()
		}

		if ((newMaxValue === DEFAULT_STEP && event.keyCode === 40) || (newMaxValue === LIMIT_VALUE && event.keyCode === 38)) {
			event.preventDefault()
		}

		if (newMaxValue === LIMIT_VALUE - 1 || newMaxValue === DEFAULT_STEP + 1) {
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

		if ((newMinValue === DEFAULT_MIN && event.keyCode === 40) || (newMinValue === LIMIT_VALUE && event.keyCode === 38)) {
			event.preventDefault()
		}

		if ((newMinValue !== DEFAULT_MIN && event.keyCode === 40) || (newMinValue !== LIMIT_VALUE && event.keyCode === 38)) {
			setMinButtonDopClass('settings__button--active')
		} else {
			resetButtonDopClass()
		}

		if (newMinValue === LIMIT_VALUE + 1 || newMinValue === DEFAULT_MIN + 1) {
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
		if (newStepValue === DEFAULT_STEP && event.keyCode === 40) {
			event.preventDefault()
		}

		if ((newStepValue === DEFAULT_MIN && event.keyCode === 40) || (event.keyCode === 38 && newStepValue === LIMIT_VALUE)) {
			event.preventDefault()
		}

		if ((event.keyCode === 40 && newStepValue > DEFAULT_MIN + 2) || (event.keyCode === 38 && newStepValue !== LIMIT_VALUE)) {
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
		setNewMaxValue((actual) => actual + 1)
		maxRef.current && maxRef.current.focus()
	}, [maxRef])

	const minPlusOnClickHandler = useCallback(() => {
		setNewMinValue((actual) => actual + 1)
		minRef.current && minRef.current.focus()
	}, [minRef])

	const stepPlusOnClickHandler = useCallback(() => {
		setNewStepValue((actual) => actual + 1)
		stepRef.current && stepRef.current.focus()
	}, [stepRef])

	const maxMinusButtonDisabled = newMaxValue < DEFAULT_MIN + DEFAULT_STEP + DEFAULT_STEP
	const maxPLusButtonDisabled = newMaxValue === LIMIT_VALUE

	const minMinusButtonDisabled = newMinValue === DEFAULT_MIN
	const minPLusButtonDisabled = newMinValue === LIMIT_VALUE

	const stepMinusButtonDisabled = newStepValue === DEFAULT_MIN + 1
	const stepPLusButtonDisabled = newStepValue === LIMIT_VALUE - 1

	// MinusOnClick
	const maxMinusOnClickHandler = useCallback(() => {
		!maxMinusButtonDisabled && setNewMaxValue((actual) => actual - 1);
		maxRef.current && maxRef.current.focus()
	}, [maxMinusButtonDisabled, maxRef])

	const minMinusOnClickHandler = useCallback(() => {
		!minMinusButtonDisabled && setNewMinValue((actual) => actual - 1);
		minRef.current && minRef.current.focus()
	}, [minMinusButtonDisabled, minRef])

	const stepMinusOnClickHandler = useCallback(() => {
		!stepMinusButtonDisabled && setNewStepValue((actual) => actual - 1);
		stepRef.current && stepRef.current.focus()
	}, [stepMinusButtonDisabled, stepRef])

	useEffect(() => {
		errorMax && setErrorMax('')
		errorStep && setErrorStep('')
		errorMin && setErrorMin('')
		warning && setWarning('')

		if (((newMaxValue - newMinValue) % newStepValue !== 0) && (newMaxValue >= newStepValue) && newMinValue < newMaxValue) {
			setWarning(warningMessage)
		}

		if (newMaxValue < newStepValue) {
			setErrorMax(errorMessageGreaterMaxForStep)
			setErrorStep(errorMessageGreaterStep)
		}

		if (newMinValue >= newMaxValue) {
			setErrorMin(errorMessageLessMin)
			setErrorMax(errorMessageGreaterMax)
		}

		if (newMinValue === DEFAULT_MIN && newMaxValue === DEFAULT_MAX && newStepValue === DEFAULT_STEP) {
			setDefaultDisabled(true)
		} else if (newMinValue !== DEFAULT_MIN || newMaxValue !== DEFAULT_MAX || newStepValue !== DEFAULT_STEP) {
			setDefaultDisabled(false)
		}

		return () => {}
	}, [newMinValue, newMaxValue, newStepValue])

	useEffect(() => {
		if ((newMaxValue === maxNumber && newMinValue === minNumber && newStepValue === stepNumber) || (newMaxValue < newStepValue || newMinValue >= newMaxValue)) {
			setSaveDisabled(true)
			props.notificationText === notificationForget && props.callbackForNotification(notificationCan)

		} else if ((newMaxValue !== maxNumber || newMinValue !== minNumber || newStepValue !== stepNumber) || (newMaxValue >= newStepValue || newMinValue < newMaxValue)) {
			setSaveDisabled(false)
			props.callbackForNotification(notificationForget)
		}

		return () => {}
	}, [newMaxValue, newMinValue, newStepValue, maxNumber, minNumber, stepNumber])

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value = event.currentTarget.value.replace(/^0/, '');
	}

	// OnChange
	const maxOnChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		onChangeHandler(event)

		if (Number(event.currentTarget.value) > LIMIT_VALUE) {
			setErrorMax(errorMessageLength)

			if (Array.from(event.currentTarget.value).length <= String(LIMIT_VALUE).split("").length) {
				setNewMaxValue(Number(event.currentTarget.value))
			}
		} else {
			setNewMaxValue(Number(event.currentTarget.value))
		}
	}, [onChangeHandler, LIMIT_VALUE, LIMIT_VALUE])

	const minOnChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		onChangeHandler(event)

		if (Number(event.currentTarget.value) > LIMIT_VALUE) {
			setErrorMin(errorMessageLength)

			if (Array.from(event.currentTarget.value).length <= String(LIMIT_VALUE).split("").length) {
				setNewMinValue(Number(event.currentTarget.value))
			}
		} else {
			setNewMinValue(Number(event.currentTarget.value))
		}
	}, [onChangeHandler, LIMIT_VALUE])

	const stepOnChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		onChangeHandler(event)

		if (event.currentTarget.value.length > 3) {
			setNewStepValue(newStepValue)
		} else {
			setNewStepValue(Number(event.currentTarget.value));
		}
	}, [onChangeHandler])

	// Settings
	const saveSettings = useCallback(() => {
		props.saveSettings(newMaxValue, newMinValue, newStepValue);
		props.callbackForNotification(notificationSave)
	}, [newMaxValue, newMinValue, newStepValue, notificationSave, props.saveSettings, props.callbackForNotification])

	const resetError = () => {
		errorMax && setErrorMax('');
		errorMin && setErrorMin('');
		errorStep && setErrorStep('');
	};

	const defaultSettings = useCallback(() => {
		setNewMaxValue(DEFAULT_MAX);
		setNewMinValue(DEFAULT_MIN);
		setNewStepValue(DEFAULT_STEP);
		props.saveSettings(DEFAULT_MAX, DEFAULT_MIN, DEFAULT_STEP);
		props.callbackForNotification(notificationDefault);
		resetError();
	}, [DEFAULT_MAX, DEFAULT_MIN, DEFAULT_STEP, notificationDefault, props.saveSettings, props.callbackForNotification, resetError])

	const randomSettings = useCallback(() => {
		const randomMax = Math.floor(Math.random() * ( LIMIT_VALUE - newStepValue )) + newStepValue;
		const randomMin = Math.floor(Math.random() * ( randomMax - stepNumber ));

		let randomStep = 0;
		do {
			randomStep = Math.floor(Math.random() * randomMax) + 1;
		} while (( randomMax - randomMin ) % randomStep !== 0);

		setNewMaxValue(randomMax);
		setNewMinValue(randomMin);
		setNewStepValue(randomStep);
		resetError();
		props.saveSettings(randomMax, randomMin, randomStep);
		props.callbackForNotification(notificationRandom);
	}, [LIMIT_VALUE, newStepValue, stepNumber, resetError, props.saveSettings, props.callbackForNotification])

	return (
		<form className="settings__form" action={'#'}>
			<div className="tablo">
				<div className="settings__items">
					<SettingsItem
						labelText={"Enter max value"}
						inputId={"max"}
						error={errorMax}
						newValue={newMaxValue}
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
						valueForInput={newMaxValue ? newMaxValue : 1}
					/>
					<SettingsItem
						labelText={"Enter min value"}
						inputId={"min"}
						error={errorMin}
						newValue={newMinValue}
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
						valueForInput={newMinValue}
					/>
					<SettingsItem
						labelText={"Enter step"}
						inputId={"step"}
						error={errorStep}
						newValue={newStepValue}
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
						valueForInput={newStepValue}
						warning={warning}
					/>
				</div>
			</div>
			<SettingsManagement saveSettings={saveSettings} defaultSettings={defaultSettings} randomSettings={randomSettings} saveDisabled={saveDisabled} defaultDisabled={defaultDisabled}></SettingsManagement>
		</form>
	);
};