import React, { memo } from 'react'

type SettingsManagementPropsType = {
  defaultDisabled: boolean
  defaultSettings: () => void
  randomSettings: () => void
  saveDisabled: boolean
  saveSettings: () => void
}

export const SettingsManagement: React.FC<SettingsManagementPropsType> = memo(props => {
  return (
    <div className={'management'}>
      {/*  todo: create component*/}
      <button
        className={'management__button button'}
        disabled={props.saveDisabled}
        onClick={props.saveSettings}
        type={'button'}
      >
        save
      </button>
      <button
        className={'management__button button'}
        disabled={props.defaultDisabled}
        onClick={props.defaultSettings}
        type={'button'}
      >
        default
      </button>
      <button
        className={'management__button button'}
        onClick={props.randomSettings}
        type={'button'}
      >
        random
      </button>
    </div>
  )
})
