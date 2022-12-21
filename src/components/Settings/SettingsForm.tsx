import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {SettingsManagement} from './SettingsManagement';

type SettingsFormPropsType = {
	maxNumber: number
	minNumber: number
	stepNumber: number
	LIMIT: number
	DEFAULT_MAX: number
	DEFAULT_MIN: number
	DEFAULT_STEP: number
	defaultSettings: () => void
	saveSettings: (max: number, min: number, step: number) => void
}

export const SettingsForm: React.FC<SettingsFormPropsType> = (props) => {

	const [newMaxValue, setNewMaxValue] = useState(props.maxNumber)
	const [newMinValue, setNewMinValue] = useState(props.minNumber)
	const [newStepValue, setNewStepValue] = useState(props.stepNumber)

	const [errorMax, setErrorMax] = useState('')
	const [errorMin, setErrorMin] = useState('')
	const [errorStep, setErrorStep] = useState('')

	const errorMessageGreaterMax = 'This value must be greater than the min value'
	const errorMessageLessMin = 'This value must be less than the max value'
	const errorMessageLength = 'It\'s number very long'
	const errorMessageWhole = 'Only whole numbers are allowed'
	const errorMessagePositive = 'Only positive numbers'

	const changeMaxValue = (event: ChangeEvent<HTMLInputElement>) => {
		if (errorMax && (Number(event.currentTarget.value) > newMinValue)) {
			setErrorMax('')
		}

		if (event.currentTarget.value.length > 6) {
			setErrorMax(errorMessageLength)
		} else {
			setNewMaxValue(Number(event.currentTarget.value))
		}

		if (event.currentTarget.value[0] === '0' || event.currentTarget.value.length === 0) {
			setErrorMax(errorMessageWhole)
		}
	}

	const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === ',') {
			setErrorMax(errorMessageWhole)
		}

		if (event.key === '-') {
			setErrorMax(errorMessagePositive)
		}
	}

	const changeMinValue = (event: ChangeEvent<HTMLInputElement>) => {
		errorMin && setErrorMin('')
		setNewMinValue(Number(event.currentTarget.value))
	}

	const changeStepValue = (event: ChangeEvent<HTMLInputElement>) => {
		errorStep && setErrorStep('')
		setNewStepValue(Number(event.currentTarget.value))
	}

	const saveSettings = () => {
		if (newMaxValue > newMinValue) {
			props.saveSettings(newMaxValue, newMinValue, newStepValue)
		}
		else {
			setErrorMax(errorMessageGreaterMax)
			setErrorMin(errorMessageLessMin)
		}
	}

	const resetError = () => {
		errorMax && setErrorMax('')
		errorMin && setErrorMin('')
		errorStep && setErrorStep('')
	}

	const defaultSettings = () => {
		setNewMaxValue(props.DEFAULT_MAX);
		setNewMinValue(props.DEFAULT_MIN);
		setNewStepValue(props.DEFAULT_STEP)
		props.defaultSettings();
		resetError()
	}

	const randomSettings = () => {
		const randomMax = Math.floor(Math.random() * (props.LIMIT - newStepValue)) + newStepValue;
		const randomMin = Math.floor(Math.random() * (randomMax - props.stepNumber))

		let randomStep = 0;
		do {
			randomStep = Math.floor(Math.random() * randomMax) + 1 ;
		} while ( (randomMax - randomMin) % randomStep != 0)

		setNewMaxValue(randomMax)
		setNewMinValue(randomMin)
		setNewStepValue(randomStep)
		resetError()
		props.saveSettings(randomMax, randomMin, randomStep)
	}

	return (
		<form className='settings__form' action={'#'}>
			<div className='tablo'>
				<div className="settings__items">
					<div className="settings__content">
						<div className='settings__item'>
							<label className='settings__label' htmlFor='max'>Enter max value</label>
							<input className={ errorMax ? 'settings__field field field--error' : 'settings__field' +
								' field'} id='max' value={newMaxValue} onChange={changeMaxValue} onKeyPress={onKeyPressHandler} type='number'/>
						</div>
						<span className='settings__error'>{errorMax}</span>
					</div>
					<div className="settings__content">
						<div className='settings__item'>
							<label className='settings__label' htmlFor='min'>Enter min value</label>
							<input className={ errorMin ? 'settings__field field field--error' : 'settings__field' +
								' field'} id='min' value={newMinValue} onChange={changeMinValue} onKeyPress={onKeyPressHandler} type='number'/>
						</div>
						<span className='settings__error'>{errorMin}</span>
					</div>
					<div className="settings__content">
						<div className='settings__item'>
							<label className='settings__label' htmlFor='step'>Enter step</label>
							<input className={ errorStep ? 'settings__field field field--error' : 'settings__field' +
								' field'} id='step' value={newStepValue} onChange={changeStepValue} onKeyPress={onKeyPressHandler} type='number'/>
						</div>
						<span className='settings__error'>{errorStep}</span>
					</div>
				</div>
			</div>
			<SettingsManagement saveSettings={saveSettings} defaultSettings={defaultSettings} randomSettings={randomSettings}></SettingsManagement>
		</form>
	);
};