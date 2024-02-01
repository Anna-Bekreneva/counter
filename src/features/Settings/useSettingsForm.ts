import {useDispatch} from "react-redux";
import {
    changeStatusStatisticsAC, resetStatisticsAC,
    selectDefaultMax,
    selectDefaultMin,
    selectDefaultStep,
    selectLimitValue,
    selectMaxValue, selectMinValue, selectStepValue, setValueAC,
    useAppSelector
} from "../../state";
import React, {ChangeEvent, KeyboardEvent, LegacyRef, useCallback, useEffect, useState} from "react";
import {
    errorMessageDenyStep,
    errorMessageGreaterMax,
    errorMessageGreaterMaxForStep,
    errorMessageGreaterStep, errorMessageLength,
    errorMessageLessMin, notificationCan, notificationDefault, notificationForget, notificationRandom, notificationSave,
    warningMessage
} from "../../utils/messages";

export const useSettingsForm = (callbackForNotification: (text: string) => void, notificationText: string) => {
    const dispatch = useDispatch()
    const defaultMin = useAppSelector(selectDefaultMin)
    const defaultMax = useAppSelector(selectDefaultMax)
    const defaultStep = useAppSelector(selectDefaultStep)
    const limitValue = useAppSelector(selectLimitValue)

    const maxValue = useAppSelector(selectMaxValue)
    const minValue = useAppSelector(selectMinValue)
    const stepValue = useAppSelector(selectStepValue)

    const [warning, setWarning] = useState('')

    const initialErrors = {
        max: '',
        min: '',
        step: '',
    }
    const [errors, setErrors] = useState<typeof initialErrors>(initialErrors)

    const maxRef: LegacyRef<HTMLInputElement> | undefined = React.createRef()
    const minRef: LegacyRef<HTMLInputElement> | undefined = React.createRef()
    const stepRef: LegacyRef<HTMLInputElement> | undefined = React.createRef()

    const [isDopClassForButton, setIsDopClassForButton] = useState(false)

    const initialActiveButton = {
        button: null as 'minus' | 'plus' | null,
        field: null as 'max' | 'min' | 'step' | null,
    }
    const [activeButton, setActiveButton] = useState(initialActiveButton)

    const [saveDisabled, setSaveDisabled] = useState(true)
    const [defaultDisabled, setDefaultDisabled] = useState(true)

    const [newMaxValue, setNewMaxValue] = useState(maxValue)
    const [newMinValue, setNewMinValue] = useState(minValue)
    const [newStepValue, setNewStepValue] = useState(stepValue)

    const resetButtonDopClass = useCallback(() => {
        setIsDopClassForButton(false)
        setActiveButton(initialActiveButton)
    }, [])

    // todo: do i need it?
    // useEffect(() => {
    //     setNewMaxValue(maxValue)
    //
    //     return () => {}
    // }, [maxValue])
    //
    // useEffect(() => {
    //     setNewMinValue(minValue)
    //
    //     return () => {}
    // }, [minValue])
    //
    // useEffect(() => {
    //     setNewStepValue(stepValue)
    //
    //     return () => {}
    // }, [stepValue])

    const falseStatusStatistics = () => dispatch(changeStatusStatisticsAC(false))

    // OnKeyDown
    const allKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        const symbolsForExcept = [',', '-', '+', '.']

        symbolsForExcept.includes(event.key) && event.preventDefault()
        falseStatusStatistics()
    }

    const allKeyDownHandler2 = (event: KeyboardEvent<HTMLInputElement>, field: 'max' | 'min' | 'step') => {
        if (event.keyCode === 38) {
            setActiveButton({ button: 'plus', field })
        }

        if (event.keyCode === 40) {
            setActiveButton({ button: 'minus', field })
        }
    }

    const allKeyDownHandler3 = (event: KeyboardEvent<HTMLInputElement>, newValue: number, defMin: number = defaultMin) => {
        if (
            (newValue === defMin && event.keyCode === 40) ||
            (newValue === limitValue && event.keyCode === 38)
        ) {
            event.preventDefault()
        }

        if (
            (newValue !== defMin && event.keyCode === 40) ||
            (newValue !== limitValue && event.keyCode === 38)
        ) {
            setIsDopClassForButton(true)
        } else {
            resetButtonDopClass()
        }
    }

    const maxOnKeyDownHandler = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            allKeyDownHandler(event)
            // down - 40, up - 38

            // if (
            //     (newMaxValue !== defaultStep && event.keyCode === 40) ||
            //     (newMaxValue !== limitValue && event.keyCode === 38)
            // ) {
            //     setIsDopClassForButton(true)
            // } else {
            //     resetButtonDopClass()
            // }
            //
            // if (
            //     (newMaxValue === defaultStep && event.keyCode === 40) ||
            //     (newMaxValue === limitValue && event.keyCode === 38)
            // ) {
            //     event.preventDefault()
            // }

            allKeyDownHandler3(event, newMaxValue)

            if (newMaxValue === limitValue - 1 || newMaxValue === defaultStep + 1) {
                resetButtonDopClass()
            }

            allKeyDownHandler2(event, "max")
        },
        [allKeyDownHandler, newMaxValue, defaultStep, limitValue, resetButtonDopClass]
    )

    const minOnKeyDownHandler = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            allKeyDownHandler(event)

            // down - 40, up - 38

            // if (
            //     (newMinValue === defaultMin && event.keyCode === 40) ||
            //     (newMinValue === limitValue && event.keyCode === 38)
            // ) {
            //     event.preventDefault()
            // }
            //
            // if (
            //     (newMinValue !== defaultMin && event.keyCode === 40) ||
            //     (newMinValue !== limitValue && event.keyCode === 38)
            // ) {
            //     setIsDopClassForButton(true)
            // } else {
            //     resetButtonDopClass()
            // }

            allKeyDownHandler3(event, newMinValue)

            if (newMinValue === limitValue + 1 || newMinValue === defaultMin + 1) {
                resetButtonDopClass()
            }

            allKeyDownHandler2(event, "min")

        },
        [allKeyDownHandler, newMinValue, defaultMin, limitValue]
    )

    const stepOnKeyDownHandler = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            allKeyDownHandler(event)

            // down - 40, up - 38
            if (newStepValue === defaultStep && event.keyCode === 40) {
                event.preventDefault()
            }

            // if (
            //     (newStepValue === defaultMin && event.keyCode === 40) ||
            //     (newStepValue === limitValue && event.keyCode === 38)
            // ) {
            //     event.preventDefault()
            // }
            //
            // if (
            //     (event.keyCode === 40 && newStepValue > defaultMin + 2) ||
            //     (event.keyCode === 38 && newStepValue !== limitValue)
            // ) {
            //     setIsDopClassForButton(true)
            // } else {
            //     resetButtonDopClass()
            // }
            allKeyDownHandler3(event, newMaxValue, defaultMin + 2)
            allKeyDownHandler2(event, "step")
        },
        [allKeyDownHandler, newStepValue, defaultStep, defaultMin, resetButtonDopClass]
    )

    // todo: reduce it
    // PlusOnClick
    const maxPlusOnClickHandler = useCallback(() => {
        falseStatusStatistics()
        setNewMaxValue(actual => actual + 1)
        maxRef.current && maxRef.current.focus()
    }, [maxRef])

    const minPlusOnClickHandler = useCallback(() => {
        falseStatusStatistics()
        setNewMinValue(actual => actual + 1)
        minRef.current && minRef.current.focus()
    }, [minRef])

    const stepPlusOnClickHandler = useCallback(() => {
        falseStatusStatistics()
        setNewStepValue(actual => actual + 1)
        stepRef.current && stepRef.current.focus()
    }, [stepRef])

    const maxMinusButtonDisabled = newMaxValue < defaultMin + defaultStep + defaultStep
    const maxPLusButtonDisabled = newMaxValue === limitValue

    const minMinusButtonDisabled = newMinValue === defaultMin
    const minPLusButtonDisabled = newMinValue === limitValue

    const stepMinusButtonDisabled = newStepValue === defaultMin
    const stepPLusButtonDisabled = newStepValue === limitValue - 1

    // MinusOnClick
    const maxMinusOnClickHandler = useCallback(() => {
        falseStatusStatistics()
        !maxMinusButtonDisabled && setNewMaxValue(actual => actual - 1)
        maxRef.current && maxRef.current.focus()
    }, [maxMinusButtonDisabled, maxRef])

    const minMinusOnClickHandler = useCallback(() => {
        falseStatusStatistics()
        !minMinusButtonDisabled && setNewMinValue(actual => actual - 1)
        minRef.current && minRef.current.focus()
    }, [minMinusButtonDisabled, minRef])

    const stepMinusOnClickHandler = useCallback(() => {
        falseStatusStatistics()
        !stepMinusButtonDisabled && setNewStepValue(actual => actual - 1)
        stepRef.current && stepRef.current.focus()
    }, [stepMinusButtonDisabled, stepRef])

    useEffect(() => {
        setErrors(initialErrors)

        if (
            (newMaxValue - newMinValue) % newStepValue !== 0 &&
            newMaxValue >= newStepValue &&
            newMinValue < newMaxValue
        ) {
            setWarning(warningMessage)
        } else if (
            (newMaxValue - newMinValue) % newStepValue === 0 ||
            newMaxValue < newStepValue ||
            newMinValue >= newMaxValue
        ) {
            setWarning('')
        }

        if (newMaxValue < newStepValue) {
            setErrors(errors => ( {...errors, max: errorMessageGreaterMaxForStep, step: errorMessageGreaterStep} ))
        }

        if (newMinValue >= newMaxValue) {
            setErrors(errors => ( {...errors, min: errorMessageLessMin, max: errorMessageGreaterMax} ))
        }

        if (
            newMinValue === defaultMin &&
            newMaxValue === defaultMax &&
            newStepValue === defaultStep
        ) {
            setDefaultDisabled(true)
        } else if (
            newMinValue !== defaultMin ||
            newMaxValue !== defaultMax ||
            newStepValue !== defaultStep
        ) {
            setDefaultDisabled(false)
        }

        return () => {}
    }, [newMinValue, newMaxValue, newStepValue, defaultMin, defaultMax, defaultStep])

    useEffect(() => {
        if (
            (newMaxValue === maxValue && newMinValue === minValue && newStepValue === stepValue) ||
            newMaxValue < newStepValue ||
            newMinValue >= newMaxValue
        ) {
            setSaveDisabled(true)
            notificationText === notificationForget &&
            callbackForNotification(notificationCan)
        } else if (newStepValue < defaultStep) {
            setSaveDisabled(true)
        } else if (
            newMaxValue !== maxValue ||
            newMinValue !== minValue ||
            newStepValue !== stepValue ||
            newMaxValue >= newStepValue ||
            newMinValue < newMaxValue
        ) {
            setSaveDisabled(false)
            callbackForNotification(notificationForget)
        }

        return () => {}
    }, [newMaxValue, newMinValue, newStepValue, maxValue, minValue, stepValue, defaultStep])

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.currentTarget.value = event.currentTarget.value.replace(/^0/, '')
        falseStatusStatistics()
    }

    // OnChange
    const maxOnChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChangeHandler(event)

            if (Number(event.currentTarget.value) > limitValue) {
                setErrors(errors => ( {...errors, max: errorMessageLength} ))

                if (Array.from(event.currentTarget.value).length <= String(limitValue).split('').length) {
                    setNewMaxValue(Number(event.currentTarget.value))
                }
            } else {
                setNewMaxValue(Number(event.currentTarget.value))
            }
        },
        [onChangeHandler, limitValue]
    )

    const minOnChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChangeHandler(event)

            if (Number(event.currentTarget.value) > limitValue) {
                setErrors( errors => ({ ...errors, min: errorMessageLength }) )

                if (Array.from(event.currentTarget.value).length <= String(limitValue).split('').length) {
                    setNewMinValue(Number(event.currentTarget.value))
                }
            } else {
                setNewMinValue(Number(event.currentTarget.value))
            }
        },
        [onChangeHandler, limitValue]
    )

    const stepOnChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChangeHandler(event)

            if (event.currentTarget.value.length > 3) {
                setNewStepValue(newStepValue)
            } else if (Number(event.currentTarget.value) < defaultStep) {
                setErrors( errors => ( { ...errors, step: errorMessageDenyStep}) )
                setNewStepValue(Number(event.currentTarget.value))
            } else {
                setNewStepValue(Number(event.currentTarget.value))
            }
        },
        [onChangeHandler, newStepValue]
    )

    // Settings
    const saveSettings = (max: number, min: number, step: number) => {
        setNewMaxValue(max)
        setNewMinValue(min)
        setNewStepValue(step)

        dispatch(setValueAC('maxValue', max))
        dispatch(setValueAC('minValue', min))
        dispatch(setValueAC('stepValue', step))
        dispatch(setValueAC('counter', min))

        dispatch(changeStatusStatisticsAC(true))
        dispatch(resetStatisticsAC())
    }

    const clickSaveSettings = useCallback(() => {
        saveSettings(newMaxValue, newMinValue, newStepValue)
        callbackForNotification(notificationSave)
    }, [
        newMaxValue,
        newMinValue,
        newStepValue,
        saveSettings,
        notificationSave,
        callbackForNotification,
    ])

    const defaultSettings = useCallback(() => {
        saveSettings(defaultMax, defaultMin, defaultStep)
        callbackForNotification(notificationDefault)
        setErrors(initialErrors)
    }, [
        defaultMax,
        defaultMin,
        defaultStep,
        saveSettings,
        callbackForNotification,
        notificationDefault,
    ])

    const randomSettings = useCallback(() => {
        const randomMax = Math.floor(Math.random() * (limitValue - newStepValue)) + newStepValue
        const randomMin = Math.floor(Math.random() * (randomMax - stepValue))

        let randomStep = 0

        do {
            randomStep = Math.floor(Math.random() * randomMax) + 1
        } while ((randomMax - randomMin) % randomStep !== 0)

        saveSettings(randomMax, randomMin, randomStep)
        setErrors(initialErrors)
        callbackForNotification(notificationRandom)
    }, [
        limitValue,
        newStepValue,
        stepValue,
        saveSettings,
        callbackForNotification,
        notificationRandom,
    ])

    return {
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
}