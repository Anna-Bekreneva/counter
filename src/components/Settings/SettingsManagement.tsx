import React from 'react';

type SettingsManagementPropsType = {
	error: boolean
	saveSettings: () => void
	defaultSettings: () => void
}

export const SettingsManagement: React.FC<SettingsManagementPropsType> = (props) => {

	return (
		<div className='management'>
			<button className='management__button button' type='button' onClick={props.saveSettings} disabled={props.error}>save</button>
			<button className='management__button button' type='button' onClick={props.defaultSettings}>default</button>
			<button className='management__button button' type='button' onClick={() => {}}>random</button>
		</div>
	)
}