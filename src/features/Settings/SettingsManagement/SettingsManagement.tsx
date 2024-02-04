import React, {FC, memo} from 'react'
import {SettingsManagementButton} from "./SettingsManagementButton";

type PropsType = {
  defaultDisabled: boolean
  saveDisabled: boolean
  defaultSettings: () => void
  randomSettings: () => void
  saveSettings: () => void
}

export const SettingsManagement: FC<PropsType> = memo( (
    { randomSettings, defaultSettings, saveSettings, saveDisabled, defaultDisabled }
) => {
  return (
    <div className={'management'}>
        <SettingsManagementButton callback={saveSettings} disabled={saveDisabled}>save</SettingsManagementButton>
        <SettingsManagementButton callback={defaultSettings} disabled={defaultDisabled}>default</SettingsManagementButton>
        <SettingsManagementButton callback={randomSettings}>random</SettingsManagementButton>
    </div>
  )
})
