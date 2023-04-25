import React, {memo, useCallback, useState} from 'react';
import {SettingsForm} from './SettingsForm';
import {Notification} from './Notification';

type SettingsPropsType = {}

export const Settings: React.FC<SettingsPropsType> = memo((props) => {
	const [notificationText, setNotificationText] = useState('You can manage settings')

	const callbackForNotification = useCallback((text: string) => setNotificationText(text), [])

	return (
		<div className='settings'>
			<h2 className='title'>Settings</h2>
			<Notification text={notificationText}/>
			<SettingsForm callbackForNotification={callbackForNotification} notificationText={notificationText}></SettingsForm>
		</div>
	)
})
