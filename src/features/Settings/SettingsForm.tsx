import React, {FC,} from 'react'
import {SettingsItem} from './SettingsItem'
import {SettingsManagement} from './SettingsManagement'
import {useSettingsForm} from "./useSettingsForm";

type SettingsFormPropsType = {
  callbackForNotification: (text: string) => void
  notificationText: string
}

export const SettingsForm: FC<SettingsFormPropsType> = props => {

  const {
    isDopClassForButton,
    maxOnChangeHandler,
    minOnChangeHandler,
    stepOnChangeHandler,
    warning,
    activeButton,
    saveDisabled,
    defaultDisabled,
    newMaxValue,
    newMinValue,
    newStepValue,
    maxOnKeyDownHandler,
    minOnKeyDownHandler,
    stepOnKeyDownHandler,
    maxPlusOnClickHandler,
    minPlusOnClickHandler,
    stepPlusOnClickHandler,
    maxMinusButtonDisabled,
    maxPLusButtonDisabled,
    minMinusButtonDisabled,
    minPLusButtonDisabled,
    stepMinusButtonDisabled,
    stepPLusButtonDisabled,
    maxMinusOnClickHandler,
    minMinusOnClickHandler,
    stepMinusOnClickHandler,
    errors,
    maxRef,
    resetButtonDopClass,
    minRef,
    stepRef,
    defaultSettings,
    randomSettings,
    clickSaveSettings
  }
      = useSettingsForm(props.callbackForNotification, props.notificationText)

  return (
    <form action={'#'} className={'settings__form'}>
      <div className={'tablo'}>
        <div className={'settings__items'}>
          <SettingsItem
            key={'max'}
            isDopClassForButton={isDopClassForButton}
            changeHandler={maxOnChangeHandler}
            error={errors.max}
            inputId={'max'}
            labelText={'Enter max value'}
            link={maxRef}
            maxButtonDisabled={maxPLusButtonDisabled}
            minusButtonDisabled={maxMinusButtonDisabled}
            minusOnClick={maxMinusOnClickHandler}
            newValue={newMaxValue}
            onKeyDown={maxOnKeyDownHandler}
            plusOnClick={maxPlusOnClickHandler}
            resetButtonDopClass={resetButtonDopClass}
            whichButtonDopClass={activeButton.field === 'max' ? activeButton.button : null}
          />
          <SettingsItem
            key={'min'}
            isDopClassForButton={isDopClassForButton}
            changeHandler={minOnChangeHandler}
            error={errors.min}
            inputId={'min'}
            labelText={'Enter min value'}
            link={minRef}
            maxButtonDisabled={minPLusButtonDisabled}
            minusButtonDisabled={minMinusButtonDisabled}
            minusOnClick={minMinusOnClickHandler}
            newValue={newMinValue}
            onKeyDown={minOnKeyDownHandler}
            plusOnClick={minPlusOnClickHandler}
            resetButtonDopClass={resetButtonDopClass}
            whichButtonDopClass={activeButton.field === 'min' ? activeButton.button : null}
          />
          <SettingsItem
            key={'step'}
            isDopClassForButton={isDopClassForButton}
            changeHandler={stepOnChangeHandler}
            error={errors.step}
            inputId={'step'}
            labelText={'Enter step'}
            link={stepRef}
            maxButtonDisabled={stepPLusButtonDisabled}
            minusButtonDisabled={stepMinusButtonDisabled}
            minusOnClick={stepMinusOnClickHandler}
            newValue={newStepValue}
            onKeyDown={stepOnKeyDownHandler}
            plusOnClick={stepPlusOnClickHandler}
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
        saveSettings={clickSaveSettings}
      ></SettingsManagement>
    </form>
  )
}
