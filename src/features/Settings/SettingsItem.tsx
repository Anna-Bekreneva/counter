import React, {ChangeEvent, KeyboardEvent, memo, useCallback} from 'react'

import { Warning } from '../Warning'

type settingsItemPropsType = {
  isDopClassForButton: boolean
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void
  error: string
  inputId: string
  labelText: string
  link: React.RefObject<HTMLInputElement>
  maxButtonDisabled: boolean
  minusButtonDisabled: boolean
  minusOnClick: () => void
  newValue: number
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  plusOnClick: () => void
  resetButtonDopClass: () => void
  warning?: string
  whichButtonDopClass: 'minus' | 'plus' | null
}

export const SettingsItem: React.FC<settingsItemPropsType> = memo(props => {
  console.log(props.whichButtonDopClass)
  return (
    <div className={'settings__content'}>
      <div className={'settings__item'}>
        <label className={'settings__label'} htmlFor={props.inputId}>
          {props.labelText}
        </label>
        <div
          className={props.error ? 'settings__field field field--error' : 'settings__field field'}
        >
          {props.warning && <Warning text={props.warning}></Warning>}
          {/* todo: create component */}
          <button
            className={
              props.whichButtonDopClass === 'minus'
                ? `settings__button settings__button--minus button ${props.isDopClassForButton && 'settings__button--active' }`
                : 'settings__button settings__button--minus button'
            }
            disabled={props.minusButtonDisabled}
            onClick={props.minusOnClick}
            type={'button'}
          >
            -
          </button>
          <input
            className={'settings__input'}
            id={props.inputId}
            name={'max'}
            onBlur={props.resetButtonDopClass}
            onChange={props.changeHandler}
            onKeyDown={props.onKeyDown}
            ref={props.link}
            type={'number'}
            value={props.newValue}
          />
          <button
            className={
              props.whichButtonDopClass === 'plus'
                ? `settings__button settings__button--plus button ${props.isDopClassForButton && 'settings__button--active' }`
                : 'settings__button settings__button--plus button'
            }
            disabled={props.maxButtonDisabled}
            onClick={props.plusOnClick}
            type={'button'}
          >
            +
          </button>
        </div>
      </div>
      {props.error && <span className={'settings__error'}>{props.error}</span>}
    </div>
  )
})
