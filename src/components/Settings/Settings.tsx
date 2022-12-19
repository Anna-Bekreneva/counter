import React from 'react';
import {SettingsForm} from './SettingsForm';
import {ButtonSettingsType} from '../../App';

type SettingsPropsType = {
	maxNumber: number
	minNumber: number
	buttonSettingsOnClickCallback: (type: ButtonSettingsType, max: number, min: number) => void
}

export const Settings: React.FC<SettingsPropsType> = (props) => {
	return (
		<div className='settings'>
			<h2 className='title'>Settings</h2>
			<SettingsForm maxNumber={props.maxNumber} minNumber={props.minNumber} buttonSettingsOnClickCallback={props.buttonSettingsOnClickCallback}></SettingsForm>
		</div>
	)
}