import React, {ChangeEvent, KeyboardEvent, memo, RefObject} from 'react'

import { Warning } from '../../Warning'
import {SettingsButton} from "../SettingsButton";

type PropsType = {
  isDopClassForButton: boolean
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  error: string
  inputId: string
  labelText: string
  link: RefObject<HTMLInputElement> | null
  plusButtonDisabled: boolean
  minusButtonDisabled: boolean
  minusOnClick: () => void
  newValue: number
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  plusOnClick: () => void
  resetButtonDopClass: () => void
  warning?: string
  whichButtonDopClass: 'minus' | 'plus' | null
}
export const SettingsItem: React.FC<PropsType> = memo((
    { plusButtonDisabled, minusButtonDisabled, plusOnClick, minusOnClick, whichButtonDopClass,
         isDopClassForButton, resetButtonDopClass, link, warning, error,
         inputId, changeHandler, labelText, newValue, onKeyDown }
) => {
  return (
    <div className={'settings__content'}>
      <div className={'settings__item'}>
        <label className={'settings__label'} htmlFor={inputId}>
          {labelText}
        </label>
        <div
          className={error ? 'settings__field field field--error' : 'settings__field field'}
        >
          {warning && <Warning text={warning}></Warning>}

          <SettingsButton typeButton={'minus'}
                         buttonDisabled={minusButtonDisabled}
                         isDopClassForButton={isDopClassForButton}
                         whichButtonDopClass={whichButtonDopClass}
                         callback={minusOnClick}> - </SettingsButton>
          <input
            className={'settings__input'}
            id={inputId}
            name={'max'}
            onBlur={resetButtonDopClass}
            onChange={changeHandler}
            onKeyDown={onKeyDown}
            ref={link}
            type={'number'}
            value={newValue}
          />

            <SettingsButton typeButton={'plus'}
                           buttonDisabled={plusButtonDisabled}
                           isDopClassForButton={isDopClassForButton}
                           whichButtonDopClass={whichButtonDopClass}
                           callback={plusOnClick}> - </SettingsButton>

        </div>
      </div>
      {error && <span className={'settings__error'}>{error}</span>}
    </div>
  )
})