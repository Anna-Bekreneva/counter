import React from 'react';
import {SettingsForm} from './SettingsForm';


type SettingsPropsType = {
	maxNumber: number
	minNumber: number
	DEFAULT_MAX: number
	DEFAULT_MIN: number
	defaultSettings: () => void
	saveSettings: (max: number, min: number) => void
}

export const Settings: React.FC<SettingsPropsType> = (props) => {
	return (
		<div className='settings'>
			<h2 className='title'>Settings</h2>
			<SettingsForm saveSettings={props.saveSettings} defaultSettings={props.defaultSettings} maxNumber={props.maxNumber} minNumber={props.minNumber}  DEFAULT_MAX={props.DEFAULT_MAX} DEFAULT_MIN={props.DEFAULT_MIN}></SettingsForm>
		</div>
	)
}