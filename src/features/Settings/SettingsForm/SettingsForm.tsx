import React, {FC, memo,} from 'react'
import {SettingsItem} from '../SettingsItem'
import {SettingsManagement} from '../SettingsManagement/SettingsManagement'
import {useSettingsForm} from "./useSettingsForm";

type PropsType = {
  setNotification: (text: string) => void
  notification: string
}

export const SettingsForm: FC<PropsType> = memo(({ setNotification, notification }) => {

  const {
    isDopClassForButton,
    changeHandlers,
    warning,
    activeButton,
    saveDisabled,
    defaultDisabled,
    newValues,
    keyDownHandlers,
    buttonPlusHandler,
    disabledButtons,
    buttonMinusHandler,
    errors,
    resetButtonDopClass,
    fieldRefs,
    defaultSettings,
    randomSettings,
    saveSettings
  }
      = useSettingsForm(setNotification, notification)

  return (
      <form action={'#'} className={'settings__form'}>
        <div className={'tablo'}>
          <div className={'settings__items'}>
            <SettingsItem
                key={'max'}
                isDopClassForButton={isDopClassForButton}
                changeHandler={changeHandlers.max}
                error={errors.max}
                inputId={'max'}
                labelText={'Enter max value'}
                link={fieldRefs.max}
                plusButtonDisabled={disabledButtons.maxPLus}
                minusButtonDisabled={disabledButtons.maxMinus}
                minusOnClick={() => buttonMinusHandler('max')}
                newValue={newValues.max}
                onKeyDown={keyDownHandlers.max}
                plusOnClick={() => buttonPlusHandler("max")}
                resetButtonDopClass={resetButtonDopClass}
                whichButtonDopClass={activeButton.field === 'max' ? activeButton.button : null}
            />
            <SettingsItem
                key={'min'}
                isDopClassForButton={isDopClassForButton}
                changeHandler={changeHandlers.min}
                error={errors.min}
                inputId={'min'}
                labelText={'Enter min value'}
                link={fieldRefs.min}
                plusButtonDisabled={disabledButtons.minPLus}
                minusButtonDisabled={disabledButtons.minMinus}
                minusOnClick={() => buttonMinusHandler('min')}
                newValue={newValues.min}
                onKeyDown={keyDownHandlers.min}
                plusOnClick={() => buttonPlusHandler("min")}
                resetButtonDopClass={resetButtonDopClass}
                whichButtonDopClass={activeButton.field === 'min' ? activeButton.button : null}
            />
            <SettingsItem
                key={'step'}
                isDopClassForButton={isDopClassForButton}
                changeHandler={changeHandlers.step}
                error={errors.step}
                inputId={'step'}
                labelText={'Enter step'}
                link={fieldRefs.step}
                plusButtonDisabled={disabledButtons.stepPLus}
                minusButtonDisabled={disabledButtons.stepMinus}
                minusOnClick={() => buttonMinusHandler('step')}
                newValue={newValues.step}
                onKeyDown={keyDownHandlers.step}
                plusOnClick={() => buttonPlusHandler("step")}
                resetButtonDopClass={resetButtonDopClass}
                warning={warning}
                whichButtonDopClass={activeButton.field === 'step' ? activeButton.button : null}
            />
          </div>
        </div>
        <SettingsManagement
            defaultDisabled={defaultDisabled}
            defaultSettings={defaultSettings}
            randomSettings={randomSettings}
            saveDisabled={saveDisabled}
            saveSettings={saveSettings}
        />
      </form>
  )
})
