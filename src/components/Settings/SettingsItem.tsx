import React, {ChangeEvent, KeyboardEvent, memo} from 'react';
import {Warning} from '../Warning';

type settingsItemPropsType = {
	labelText: string
	inputId: string
	error: string
	newValue: number
	changeHandler: (event: ChangeEvent<HTMLInputElement>) => void
	onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
	link: any
	resetButtonDopClass: () => void
	whichButtonDopClass: 'plus' | 'minus' | null
	buttonDopClass: string
	minusOnClick: () => void
	plusOnClick: () => void
	minusButtonDisabled: boolean
	maxButtonDisabled: boolean
	valueForInput: number
	warning?: string
}

export const SettingsItem: React.FC<settingsItemPropsType> = memo((props) => {
	return (
		<div className="settings__content">
			<div className="settings__item">
				<label className="settings__label" htmlFor={props.inputId}>{props.labelText}</label>
				<div className={props.error ? 'settings__field field field--error' : 'settings__field field'}>
					{props.warning && <Warning text={props.warning}></Warning>}
					<button className={props.whichButtonDopClass === 'minus' ? `settings__button settings__button--minus button ${props.buttonDopClass}` : 'settings__button settings__button--minus button'} type="button" onClick={props.minusOnClick} disabled={props.minusButtonDisabled}>-</button>
					<input className="settings__input" id={props.inputId} value={props.valueForInput} onChange={props.changeHandler} onKeyDown={props.onKeyDown} ref={props.link} onBlur={props.resetButtonDopClass} name="max" type="number"/>
					<button className={props.whichButtonDopClass === 'plus' ? `settings__button settings__button--plus button ${props.buttonDopClass}` : 'settings__button settings__button--plus button'} type="button" onClick={props.plusOnClick} disabled={props.maxButtonDisabled}>+</button>
				</div>
			</div>
			{props.error && <span className="settings__error">{props.error}</span>}
		</div>
	);
})