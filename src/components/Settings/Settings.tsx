import React, {memo, useCallback, useState} from 'react';
import {SettingsForm} from './SettingsForm';
import {Notification} from './Notification';

type SettingsPropsType = {
	maxNumber: number
	minNumber: number
	stepNumber: number
	LIMIT_VALUE: number
	DEFAULT_MAX: number
	DEFAULT_MIN: number
	DEFAULT_STEP: number
	saveSettings: (max: number, min: number, step: number) => void
}

export const Settings: React.FC<SettingsPropsType> = memo((props) => {

	const [notificationText, setNotificationText] = useState('You can manage settings')

	const callbackForNotification = useCallback((text: string) => setNotificationText(text), [])

	return (
		<div className='settings'>
			<h2 className='title'>Settings</h2>
			<Notification text={notificationText}/>
			<SettingsForm saveSettings={props.saveSettings} maxNumber={props.maxNumber} minNumber={props.minNumber}  stepNumber={props.stepNumber} DEFAULT_MAX={props.DEFAULT_MAX} DEFAULT_MIN={props.DEFAULT_MIN} DEFAULT_STEP={props.DEFAULT_STEP} LIMIT_VALUE={props.LIMIT_VALUE} callbackForNotification={callbackForNotification} notificationText={notificationText}></SettingsForm>
		</div>
	)
})