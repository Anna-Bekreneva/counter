import React, {ChangeEvent, FormEvent, KeyboardEvent, LegacyRef, useEffect, useState} from 'react';
import {SettingsManagement} from './SettingsManagement';
import {Warning} from '../Warning';
import {SettingsItem} from './SettingsItem';

type SettingsFormPropsType = {
	maxNumber: number
	minNumber: number
	stepNumber: number
	LIMIT_VALUE: number
	DEFAULT_MAX: number
	DEFAULT_MIN: number
	DEFAULT_STEP: number
	defaultSettings: () => void
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
	const [errorAllDefault, setErrorAllDefault] = useState(true)

	const errorAll = errorAllDefault || errorStep ? true : false || errorMax ? true : false || errorMin ? true : false

	const warningMessage = 'With this step it is impossible to get the maximum number'
	const errorMessageGreaterMax = 'This value must be greater than the min value';
	const errorMessageLessMin = 'This value must be less than the max value';
	const errorMessageLength = 'It\'s number very big';
	const errorMessageGreaterStep = 'The step must be less than the maximum number';
	const errorMessageZero = 'Number cannot start from zero';

	const maxRef: LegacyRef<HTMLInputElement> | undefined = React.createRef()
	const minRef: LegacyRef<HTMLInputElement> | undefined = React.createRef()
	const stepRef: LegacyRef<HTMLInputElement> | undefined = React.createRef()

	const [maxButtonDopClass, setMaxButtonDopClass] = useState('')
	const [minButtonDopClass, setMinButtonDopClass] = useState('')
	const [whichButtonMaxDopClass, setWhichButtonMaxDopClass] = useState<'plus' | 'minus' | null>(null)
	const [whichButtonMinDopClass, setWhichButtonMinDopClass] = useState<'plus' | 'minus' | null>(null)

	const resetButtonDopClass = () => {
		setMaxButtonDopClass('')
		setWhichButtonMaxDopClass(null)
		setWhichButtonMinDopClass(null)
	}

	// OnKeyDown
	const allOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		const symbolsForExcept = [',', '-', '+', '.'];
		symbolsForExcept.includes(event.key) && event.preventDefault();
	}

	const maxOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		allOnKeyDownHandler(event)
		// down - 40, up - 38

		if ((event.keyCode === 40 && newMaxValue !== props.DEFAULT_STEP) || (event.keyCode === 38 && newMaxValue !== props.LIMIT_VALUE)) {
			setMaxButtonDopClass('settings__button--active')
		} else {
			resetButtonDopClass()
		}

		if ((event.keyCode === 40 && newMaxValue === props.DEFAULT_STEP) || (event.keyCode === 38 && newMaxValue === props.LIMIT_VALUE)) {
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

		if ((newMinValue === props.DEFAULT_MIN && event.keyCode === 40) || (event.keyCode === 38 && newMinValue === props.LIMIT_VALUE)) {
			event.preventDefault()
		}

		if ((event.keyCode === 40 && newMinValue !== props.DEFAULT_MIN) || (event.keyCode === 38 && newMaxValue !== props.LIMIT_VALUE)) {
			setMinButtonDopClass('settings__button--active')
		} else {
			resetButtonDopClass()
		}

		if (newMinValue === props.DEFAULT_MIN) {
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

		if (newStepValue === props.DEFAULT_STEP && event.keyCode === 40) {
			event.preventDefault()
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

	// Click on minus/plus button for max value
	useEffect(() => {
		if (newMaxValue <= newMinValue) {
			setErrorMin(errorMessageLessMin)
			setErrorMax(errorMessageGreaterMax)
		}

		if ((newMaxValue > newMinValue) && errorMin === errorMessageLessMin && errorMax === errorMessageGreaterMax) {
			setErrorMin('')
			setErrorMax('')
		}

		if ((newMaxValue - newMinValue) % newStepValue !== 0) {
			setWarning(warningMessage)
		}
	}, [newMaxValue, newMinValue])

	const maxMinusButtonDisabled = newMaxValue < props.DEFAULT_MIN + props.DEFAULT_STEP + props.DEFAULT_STEP
	const maxPLusButtonDisabled = newMaxValue === props.LIMIT_VALUE

	const minMinusButtonDisabled = newMinValue === props.DEFAULT_MIN
	const minPLusButtonDisabled = newMinValue === props.LIMIT_VALUE - 1

	// MinusOnClick
	const maxMinusOnClickHandler = () => {
		!maxMinusButtonDisabled && setNewMaxValue((actual) => actual - 1);
		maxRef.current && maxRef.current.focus()
	}

	const minMinusOnClickHandler = () => {
		!minMinusButtonDisabled && setNewMinValue((actual) => actual - 1);
		minRef.current && minRef.current.focus()
	}

	// OnChange
	const maxOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		errorAllDefault && setErrorAllDefault(false)
		errorMax && setErrorMax('')
		warning && setWarning('')

		event.currentTarget.value = event.currentTarget.value.replace(/^0/, '');

		if (Number(event.currentTarget.value) > props.LIMIT_VALUE) {
			setErrorMax(errorMessageLength)

			if (Array.from(event.currentTarget.value).length <= String(props.LIMIT_VALUE).split("").length) {
				setNewMaxValue(Number(event.currentTarget.value))
			}
		} else {
			setNewMaxValue(Number(event.currentTarget.value))
		}

		if (Number(event.currentTarget.value) <= newMinValue) {
			setErrorMin(errorMessageLessMin)
			setErrorMax(errorMessageGreaterMax)
		}

		if ((Number(event.currentTarget.value) > newMinValue) && errorMin === errorMessageLessMin && errorMax === errorMessageGreaterMax) {
			setErrorMin('')
			setErrorMax('')
		}

		if ((newMaxValue - newMinValue) % newStepValue !== 0) {
			setWarning(warningMessage)
		}
	};

	const minOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		errorAllDefault && setErrorAllDefault(false)
		errorMin && setErrorMin('')
		warning && setWarning('')

		event.currentTarget.value = event.currentTarget.value.replace(/^0/, '');

		if (Number(event.currentTarget.value) > props.LIMIT_VALUE) {
			setErrorMin(errorMessageLength)

			if (Array.from(event.currentTarget.value).length <= String(props.LIMIT_VALUE).split("").length) {
				setNewMinValue(Number(event.currentTarget.value))
			}
		} else {
			setNewMinValue(Number(event.currentTarget.value))
		}

		if (Number(event.currentTarget.value) >= newMaxValue) {
			setErrorMin(errorMessageLessMin)
			setErrorMax(errorMessageGreaterMax)
		}

		if ((Number(event.currentTarget.value) < newMaxValue) && errorMin === errorMessageLessMin && errorMax === errorMessageGreaterMax) {
			setErrorMin('')
			setErrorMax('')
		}

		if ((newMaxValue - newMinValue) % newStepValue !== 0) {
			setWarning(warningMessage)
		}
	};

	const stepOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		errorAllDefault && setErrorAllDefault(false)
		const reg = /^[\D0]+|\D/g
		errorStep && setErrorStep('');
		warning && setWarning('')
		setNewStepValue(Number(event.currentTarget.value));

		if (Number(event.currentTarget.value) >= newMaxValue) {
			setErrorStep(errorMessageGreaterStep)
		}

		if (reg.test(event.currentTarget.value) && event.currentTarget.value.length > 1 || event.currentTarget.value === '') {
			setErrorStep(errorMessageZero)
		}

		if (event.currentTarget.value.length > 6) {
			setNewStepValue(newStepValue)
		} else {
			setNewStepValue(Number(event.currentTarget.value));
		}

		if ((newMaxValue - newMinValue) % Number(event.currentTarget.value) !== 0) {
			setWarning(warningMessage)
		}
	};

	// Settings
	const saveSettings = () => props.saveSettings(newMaxValue, newMinValue, newStepValue)

	const resetError = () => {
		errorMax && setErrorMax('');
		errorMin && setErrorMin('');
		errorStep && setErrorStep('');
	};

	const defaultSettings = () => {
		setNewMaxValue(props.DEFAULT_MAX);
		setNewMinValue(props.DEFAULT_MIN);
		setNewStepValue(props.DEFAULT_STEP);
		props.defaultSettings();
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
					<div className="settings__content">
						<div className="settings__item">
							<div className="settings__label">
								<label htmlFor="step">Enter step</label>
								{warning && <Warning text={warning}></Warning>}
							</div>
							<input className={errorStep ? 'settings__field field field--error' : 'settings__field' + ' field'} id="step" value={newStepValue} onInput={stepOnChangeHandler} onKeyDown={stepOnKeyDownHandler} name='step' type="number"/>
						</div>
						{errorStep && <span className="settings__error">{errorStep}</span>}
					</div>
				</div>
			</div>
			<SettingsManagement saveSettings={saveSettings} defaultSettings={defaultSettings} randomSettings={randomSettings} errorAll={errorAll}></SettingsManagement>
		</form>
	);
};