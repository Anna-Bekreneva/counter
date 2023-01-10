import React, {ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState} from 'react';
import {SettingsManagement} from './SettingsManagement';
import {Warning} from '../Warning';

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

	// OnKeyDown
	const allOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		const symbolsForExcept = [',', '-', '+'];
		symbolsForExcept.includes(event.key) && event.preventDefault();
	}

	const maxOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		allOnKeyDownHandler(event)

		if (newMaxValue === props.DEFAULT_STEP && event.keyCode === 40) {
			event.preventDefault()
		}

		if(String(newMaxValue).split("").length === 1 && event.keyCode === 8) {
			setNewMaxValue(1)
		}
	};

	const minOnKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		allOnKeyDownHandler(event)

		if (newMinValue === props.DEFAULT_MIN && event.keyCode === 40) {
			event.preventDefault()
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
	}

	// Click on minus/plus button for max value
	useEffect(() => {
		if (newMaxValue <= newMinValue) {
			setErrorMin(errorMessageLessMin)
			setErrorMax(errorMessageGreaterMax)
		}

		if ((newMaxValue >= newMinValue) && errorMin === errorMessageLessMin && errorMax === errorMessageGreaterMax) {
			setErrorMin('')
			setErrorMax('')
		}

		if ((newMaxValue - newMinValue) % newStepValue !== 0) {
			setWarning(warningMessage)
		}
	}, [newMaxValue])

	const maxMinusButtonDisabled = newMaxValue < props.DEFAULT_MIN + props.DEFAULT_STEP + props.DEFAULT_STEP
	const maxPLusButtonDisabled = newMaxValue === props.LIMIT_VALUE

	// MinusOnClick
	const maxMinusOnClickHandler = () => !maxMinusButtonDisabled && setNewMaxValue((actual) => actual - 1)
	// OnChange
	const maxOnChangeHandler = (event: FormEvent<HTMLInputElement>) => {
		errorAllDefault && setErrorAllDefault(false)
		const reg = /^[\D0]+|\D/g
		errorMax && setErrorMax('')
		warning && setWarning('')

		if (reg.test(event.currentTarget.value)) {
			setErrorMax(errorMessageZero)
		}

		if (Array.from(event.currentTarget.value).length < String(props.LIMIT_VALUE).split("").length || Array.from(event.currentTarget.value).length === String(props.LIMIT_VALUE).split("").length) {
			setNewMaxValue(Number(event.currentTarget.value));
		} else {
			setErrorMax(errorMessageLength);
		}

		if (Number(event.currentTarget.value) <= newMinValue) {
			setErrorMin(errorMessageLessMin)
			setErrorMax(errorMessageGreaterMax)
		}

		if ((Number(event.currentTarget.value) >= newMinValue) && errorMin === errorMessageLessMin && errorMax === errorMessageGreaterMax) {
			setErrorMin('')
			setErrorMax('')
		}

		if ((newMaxValue - newMinValue) % newStepValue !== 0) {
			setWarning(warningMessage)
		}
	};

	const minOnInputHandler = (event: FormEvent<HTMLInputElement>) => {
		errorAllDefault && setErrorAllDefault(false)
		errorMin && setErrorMin('')
		warning && setWarning('')
		setNewMinValue(Number(event.currentTarget.value));

		const reg = /^[\D0]+|\D/g

		setNewMinValue(Number(event.currentTarget.value));

		if (reg.test(event.currentTarget.value) && event.currentTarget.value.length > 1) {
			setErrorMin(errorMessageZero)
		}

		if (event.currentTarget.value.length > 6) {
			setErrorMin(errorMessageLength);
			setNewMinValue(newMinValue)
		} else {
			setNewMinValue(Number(event.currentTarget.value));
		}

		if (Number(event.currentTarget.value) >= newMaxValue) {
			setErrorMin(errorMessageLessMin)
			setErrorMax(errorMessageGreaterMax)
		}

		if ((Number(event.currentTarget.value) <= newMaxValue) && errorMin === errorMessageLessMin && errorMax === errorMessageGreaterMax) {
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
					<div className="settings__content">
						<div className="settings__item">
							<label className="settings__label" htmlFor="max">Enter max value</label>
							<div className={errorMax ? 'settings__field field field--error' : 'settings__field field'}>
								<button className='settings__button button' type='button' onClick={maxMinusOnClickHandler} disabled={maxMinusButtonDisabled}>-</button>
								<input id="max" value={newMaxValue} placeholder={newMaxValue.toString()} onChange={maxOnChangeHandler} onKeyDown={maxOnKeyDownHandler} onFocus={() => {}} name='max' type="number"/>
								<button className='settings__button button' type='button' onClick={maxPlusOnClickHandler} disabled={maxPLusButtonDisabled}>+</button>
							</div>
						</div>
						{errorMax && <span className="settings__error">{errorMax}</span>}
					</div>
					<div className="settings__content">
						<div className="settings__item">
							<label className="settings__label" htmlFor="min">Enter min value</label>
							<input className={errorMin ? 'settings__field field field--error' : 'settings__field field'} id="min" value={newMinValue} onInput={minOnInputHandler} onKeyDown={minOnKeyDownHandler} name='min' type="number"/>
						</div>
						{errorMin && <span className="settings__error">{errorMin}</span>}
					</div>
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