import React, {memo} from 'react';

type SettingsManagementPropsType = {
	saveDisabled: boolean
	defaultDisabled: boolean
	saveSettings: () => void
	defaultSettings: () => void
	randomSettings: () => void
}

export const SettingsManagement: React.FC<SettingsManagementPropsType> = memo((props) => {

	return (
		<div className='management'>
			<button className='management__button button' type='button' onClick={props.saveSettings} disabled={props.saveDisabled}>save</button>
			<button className='management__button button' type='button' onClick={props.defaultSettings} disabled={props.defaultDisabled}>default</button>
			<button className='management__button button' type='button' onClick={props.randomSettings}>random</button>
		</div>
	)
})