import React from 'react';

type SettingsManagementPropsType = {
	errorAll: boolean
	saveSettings: () => void
	defaultSettings: () => void
	randomSettings: () => void
}

export const SettingsManagement: React.FC<SettingsManagementPropsType> = (props) => {

	return (
		<div className='management'>
			<button className='management__button button' type='button' onClick={props.saveSettings} disabled={props.errorAll}>save</button>
			<button className='management__button button' type='button' onClick={props.defaultSettings}>default</button>
			<button className='management__button button' type='button' onClick={props.randomSettings}>random</button>
		</div>
	)
}