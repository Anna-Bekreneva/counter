import React, {ChangeEvent, KeyboardEvent, LegacyRef, useEffect, useState} from 'react';
import {SettingsManagement} from './SettingsManagement';
import {SettingsItem} from './SettingsItem';

type SettingsFormPropsType = {
	maxNumber: number
	minNumber: number
	stepNumber: number
	LIMIT_VALUE: number
	DEFAULT_MAX: number
	DEFAULT_MIN: number
	DEFAULT_STEP: number
	notificationText: string
	callbackForNotification: (text: string) => void
	saveSettings: (max: number, min: number, step: number) => void
}

export const SettingsForm: React.FC<SettingsFormPropsType> = (props) => {

	const [newMaxValue, setNewMaxValue] = useState(props.maxNumber);
	const [newMinValue, setNewMinValue] = useState(props.minNumber);
	const [newStepValue, setNewStepValue] = useState(props.stepNumber);

	const [warning, setWarning] = useState('')
	const [errorMax, setErrorMax] = useState('');
	const [errorMin, setErrorMin] = useState('');
	const [errorStep, setErrorStep] = useState('');

	const warningMessage = 'With this step it is impossible to get the max value'
	const errorMessageGreaterMax = 'This value must be greater than the min value';
	const errorMessageLessMin = 'This value must be less than the max value';
	const errorMessageLength = 'It\'s number very big';
	const errorMessageGreaterStep = 'The step must be less than the maximum number';
	const errorMessageGreaterMaxForStep = 'The max value must be greater than the step';

	const notificationRandom = 'Random settings set'
	const notificationDefault = 'Default settings set'
	const notificationSave = 'Settings have been saved'
	const notificationForget = 'Don\'t forget to save your changes'
	const notificationCan = 'You can manage settings'

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


	const resetButtonDopClass = () => {
		setMaxButtonDopClass('')
		setMinButtonDopClass('')
		setStepButtonDopClass('')

		setWhichButtonMaxDopClass(null)
		setWhichButtonMinDopClass(null)
		setWhichButtonStepDopClass(null)
	}

	// OnKeyDown
	const allOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		const symbolsForExcept = [',', '-', '+', '.'];
		symbolsForExcept.includes(event.key) && event.preventDefault();
	}

	const maxOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		allOnKeyDownHandler(event)
		// down - 40, up - 38

		if ((newMaxValue !== props.DEFAULT_STEP && event.keyCode === 40) || (newMaxValue !== props.LIMIT_VALUE && event.keyCode === 38)) {
			setMaxButtonDopClass('settings__button--active')
		} else {
			resetButtonDopClass()
		}

		if ((newMaxValue === props.DEFAULT_STEP && event.keyCode === 40) || (newMaxValue === props.LIMIT_VALUE && event.keyCode === 38)) {
			event.preventDefault()
		}

		if (newMaxValue === props.LIMIT_VALUE - 1 || newMaxValue === props.DEFAULT_STEP + 1) {
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

		if ((newMinValue === props.DEFAULT_MIN && event.keyCode === 40) || (newMinValue === props.LIMIT_VALUE && event.keyCode === 38)) {
			event.preventDefault()
		}

		if ((newMinValue !== props.DEFAULT_MIN && event.keyCode === 40) || (newMinValue !== props.LIMIT_VALUE && event.keyCode === 38)) {
			setMinButtonDopClass('settings__button--active')
		} else {
			resetButtonDopClass()
		}

		if (newMinValue === props.LIMIT_VALUE + 1 || newMinValue === props.DEFAULT_MIN + 1) {
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
		if (newStepValue === props.DEFAULT_STEP && event.keyCode === 40) {
			event.preventDefault()
		}

		if ((newStepValue === props.DEFAULT_MIN && event.keyCode === 40) || (event.keyCode === 38 && newStepValue === props.LIMIT_VALUE)) {
			event.preventDefault()
		}

		if ((event.keyCode === 40 && newStepValue > props.DEFAULT_MIN + 2) || (event.keyCode === 38 && newStepValue !== props.LIMIT_VALUE)) {
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
	const maxPlusOnClickHandler = () => {
		setNewMaxValue((actual) => actual + 1)
		maxRef.current && maxRef.current.focus()
	}

	const minPlusOnClickHandler = () => {
		setNewMinValue((actual) => actual + 1)
		minRef.current && minRef.current.focus()
	}

	const stepPlusOnClickHandler = () => {
		setNewStepValue((actual) => actual + 1)
		stepRef.current && stepRef.current.focus()
	}

	const maxMinusButtonDisabled = newMaxValue < props.DEFAULT_MIN + props.DEFAULT_STEP + props.DEFAULT_STEP
	const maxPLusButtonDisabled = newMaxValue === props.LIMIT_VALUE

	const minMinusButtonDisabled = newMinValue === props.DEFAULT_MIN
	const minPLusButtonDisabled = newMinValue === props.LIMIT_VALUE

	const stepMinusButtonDisabled = newStepValue === props.DEFAULT_MIN + 1
	const stepPLusButtonDisabled = newStepValue === props.LIMIT_VALUE - 1

	// MinusOnClick
	const maxMinusOnClickHandler = () => {
		!maxMinusButtonDisabled && setNewMaxValue((actual) => actual - 1);
		maxRef.current && maxRef.current.focus()
	}

	const minMinusOnClickHandler = () => {
		!minMinusButtonDisabled && setNewMinValue((actual) => actual - 1);
		minRef.current && minRef.current.focus()
	}

	const stepMinusOnClickHandler = () => {
		!stepMinusButtonDisabled && setNewStepValue((actual) => actual - 1);
		stepRef.current && stepRef.current.focus()
	}

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
			setSaveDisabled(true)
		}

		if (newMinValue >= newMaxValue) {
			setErrorMin(errorMessageLessMin)
			setErrorMax(errorMessageGreaterMax)
			setSaveDisabled(true)
		}

		if (newMinValue === props.DEFAULT_MIN && newMaxValue === props.DEFAULT_MAX && newStepValue === props.DEFAULT_STEP) {
			setDefaultDisabled(true)
		} else if (newMinValue !== props.DEFAULT_MIN || newMaxValue !== props.DEFAULT_MAX || newStepValue !== props.DEFAULT_STEP) {
			setDefaultDisabled(false)
		}
	}, [newMinValue, newMaxValue, newStepValue])


	useEffect(() => {
		if (newMaxValue === props.maxNumber && newMinValue === props.minNumber && newStepValue === props.stepNumber) {
			setSaveDisabled(true)
			props.notificationText === notificationForget && props.callbackForNotification(notificationCan)

		} else if (newMaxValue !== props.maxNumber || newMinValue !== props.minNumber || newStepValue !== props.stepNumber) {
			setSaveDisabled(false)
			props.callbackForNotification(notificationForget)
		}
	}, [newMaxValue, newMinValue, newStepValue, props.maxNumber, props.minNumber, props.stepNumber])

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.currentTarget.value = event.currentTarget.value.replace(/^0/, '');
	}

	// OnChange
	const maxOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		onChangeHandler(event)

		if (Number(event.currentTarget.value) > props.LIMIT_VALUE) {
			setErrorMax(errorMessageLength)

			if (Array.from(event.currentTarget.value).length <= String(props.LIMIT_VALUE).split("").length) {
				setNewMaxValue(Number(event.currentTarget.value))
			}
		} else {
			setNewMaxValue(Number(event.currentTarget.value))
		}
	};

	const minOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		onChangeHandler(event)

		if (Number(event.currentTarget.value) > props.LIMIT_VALUE) {
			setErrorMin(errorMessageLength)

			if (Array.from(event.currentTarget.value).length <= String(props.LIMIT_VALUE).split("").length) {
				setNewMinValue(Number(event.currentTarget.value))
			}
		} else {
			setNewMinValue(Number(event.currentTarget.value))
		}
	};

	const stepOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		onChangeHandler(event)

		if (event.currentTarget.value.length > 3) {
			setNewStepValue(newStepValue)
		} else {
			setNewStepValue(Number(event.currentTarget.value));
		}
	};

	// Settings
	const saveSettings = () => {
		props.saveSettings(newMaxValue, newMinValue, newStepValue);
		props.callbackForNotification(notificationSave)
	}

	const resetError = () => {
		errorMax && setErrorMax('');
		errorMin && setErrorMin('');
		errorStep && setErrorStep('');
	};

	const defaultSettings = () => {
		setNewMaxValue(props.DEFAULT_MAX);
		setNewMinValue(props.DEFAULT_MIN);
		setNewStepValue(props.DEFAULT_STEP);
		props.saveSettings(props.DEFAULT_MAX, props.DEFAULT_MIN, props.DEFAULT_STEP);
		props.callbackForNotification(notificationDefault);
		resetError();
	};

	const randomSettings = () => {
		const randomMax = Math.floor(Math.random() * ( props.LIMIT_VALUE - newStepValue )) + newStepValue;
		const randomMin = Math.floor(Math.random() * ( randomMax - props.stepNumber ));

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
	};

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