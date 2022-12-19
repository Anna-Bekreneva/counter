import React from 'react';
import {ButtonSettingsType} from '../../App';

type SettingsManagementPropsType = {
	buttonSettingsOnClickCallback: (type: ButtonSettingsType) => void
}

export const SettingsManagement: React.FC<SettingsManagementPropsType> = (props) => {

	const onClickHandler = (type: ButtonSettingsType) => () => props.buttonSettingsOnClickCallback(type)

	return (
		<div className='management'>
			<button className='management__button button' type='button' onClick={onClickHandler('save')}>save</button>
			<button className='management__button button' type='button' onClick={onClickHandler('default')}>default</button>
			<button className='management__button button' type='button' onClick={onClickHandler('random')}>random</button>
		</div>
	)
}