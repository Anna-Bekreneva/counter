import React, {ChangeEvent, useState} from 'react';
import {SettingsManagement} from './SettingsManagement';

type SettingsFormPropsType = {
	maxNumber: number
	minNumber: number
	DEFAULT_MAX: number
	DEFAULT_MIN: number
	defaultSettings: () => void
	saveSettings: (max: number, min: number) => void
}

export const SettingsForm: React.FC<SettingsFormPropsType> = (props) => {

	const [newMaxValue, setNewMaxValue] = useState(props.maxNumber)
	const [newMinValue, setNewMinValue] = useState(props.minNumber)
	const [error, setError] = useState(false)

	const changeMaxValue = (event: ChangeEvent<HTMLInputElement>) => {
		error && setError(false)
		setNewMaxValue(Number(event.currentTarget.value))
	}

	const changeMinValue = (event: ChangeEvent<HTMLInputElement>) => {
		error && setError(false)
		setNewMinValue(Number(event.currentTarget.value))
	}

	const errorMessageMax = error && <span className='settings__error'>This value must be greater than the min value</span>
	const errorMessageMin = error && <span className='settings__error'>This value must be less than the max value</span>

	const saveSettings = () => {
		if (newMaxValue > newMinValue) {
			props.saveSettings(newMaxValue, newMinValue)
		}

		else {
			setError(true)
		}
	}

	const defaultSettings = () => {
		setNewMaxValue(props.DEFAULT_MAX);
		setNewMinValue(props.DEFAULT_MIN);
		props.defaultSettings();
		error && setError(false)
	}

	const randomSettings = () => {
		//setNewMaxValue(Math.floor(Math.random() * max));
		const max = Math.floor(Math.random() * (10000 - 0) + 0)
		const min =
		error && setError(false)
		//props.saveSettings()
	}

	return (
		<form className='settings__form' action={'#'}>
			<div className='tablo'>
				<div className="settings__items">
					<div className="settings__content">
						<div className='settings__item'>
							<label className='settings__label' htmlFor='max'>Enter max value</label>
							<input className={ error ? 'settings__field field field--error' : 'settings__field field'} value={newMaxValue} onChange={changeMaxValue} type='number'/>
						</div>
						{errorMessageMax}
					</div>
					<div className="settings__content">
						<div className='settings__item'>
							<label className='settings__label' htmlFor='min'>Enter min value</label>
							<input className={ error ? 'settings__field field field--error' : 'settings__field field'} value={newMinValue} onChange={changeMinValue} type='number'/>
						</div>
						{errorMessageMin}
					</div>
				</div>
			</div>
			<SettingsManagement saveSettings={saveSettings} defaultSettings={defaultSettings} error={error} ></SettingsManagement>
		</form>
	);
};