import React from 'react';
import {SettingsForm} from './SettingsForm';


type SettingsPropsType = {
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

export const Settings: React.FC<SettingsPropsType> = (props) => {
	return (
		<div className='settings'>
			<h2 className='title'>Settings</h2>
			<SettingsForm saveSettings={props.saveSettings} defaultSettings={props.defaultSettings} maxNumber={props.maxNumber} minNumber={props.minNumber}  stepNumber={props.stepNumber} DEFAULT_MAX={props.DEFAULT_MAX} DEFAULT_MIN={props.DEFAULT_MIN} DEFAULT_STEP={props.DEFAULT_STEP} LIMIT={props.LIMIT}></SettingsForm>
		</div>
	)
}