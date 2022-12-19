import React, {ChangeEvent, useState} from 'react';
import {SettingsManagement} from './SettingsManagement';
import {ButtonSettingsType} from '../../App';

type SettingsFormPropsType = {
	buttonSettingsOnClickCallback: (type: ButtonSettingsType, max: number, min: number) => void
}

export const SettingsForm: React.FC<SettingsFormPropsType> = (props) => {

	return (
		<form className='settings__form' action={'#'}>
			<div className='tablo'>
				<div className="settings__items">
					<div className='settings__item'>
						<label className='settings__label' htmlFor='max'>Enter max value</label>
						<input className='setting__field field' id='max' value={maxNumberValue.toString()} placeholder={maxNumberValue.toString()} onChange={changeMaxHandler} type='number'/>
					</div>
					<div className='settings__item'>
						<label className='settings__label' htmlFor='min'>Enter min value</label>
						<input className='settings__field field' id='min' value={minNumberValue.toString()} placeholder={minNumberValue.toString()} onChange={changeMinHandler} type='number'/>
					</div>
				</div>
			</div>
			<SettingsManagement buttonSettingsOnClickCallback={props.buttonSettingsOnClickCallback}></SettingsManagement>
		</form>
	);
};