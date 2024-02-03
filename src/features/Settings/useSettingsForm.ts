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
import React, {
    ChangeEvent,
    KeyboardEvent,
    RefObject,
    useCallback,
    useEffect,
    useState
} from "react";
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

    type FieldRefsType = {
        [ key: string ] : RefObject<HTMLInputElement> | null
    }
    const fieldRefs: FieldRefsType = {
        max: React.createRef(),
        min: React.createRef(),
        step: React.createRef()
    }

    const [isDopClassForButton, setIsDopClassForButton] = useState(false)
    type FieldType = 'max' | 'min' | 'step'
    const initialActiveButton = {
        button: null as 'minus' | 'plus' | null,
        field: null as FieldType | null,
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

    const _allKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => ({
        checkIncludeSymbols: () => {
            const symbolsForExcept = [',', '-', '+', '.']

            symbolsForExcept.includes(event.key) && event.preventDefault()
            falseStatusStatistics()
        },
        changeActiveButton: (field: FieldType) => {
            if (event.keyCode === 38) {
                setActiveButton({ button: 'plus', field })
            }

            if (event.keyCode === 40) {
                setActiveButton({ button: 'minus', field })
            }
        },
        compareValues: (newValue: number, defMin: number = defaultMin) => {
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
    })

    const maxKeyDownHandler = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            console.log('a')
            _allKeyDownHandler(event).checkIncludeSymbols()
            _allKeyDownHandler(event).compareValues(newMaxValue)

            if (newMaxValue === limitValue - 1 || newMaxValue === defaultStep + 1) {
                resetButtonDopClass()
            }

            _allKeyDownHandler(event).changeActiveButton("max")
        },
        [newMaxValue, defaultStep, limitValue]
    )

    const minKeyDownHandler = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            _allKeyDownHandler(event).checkIncludeSymbols()
            _allKeyDownHandler(event).compareValues(newMinValue)

            if (newMinValue === limitValue + 1 || newMinValue === defaultMin + 1) {
                resetButtonDopClass()
            }

            _allKeyDownHandler(event).changeActiveButton("min")
        },
        [newMinValue, defaultMin, limitValue]
    )

    const stepKeyDownHandler = useCallback(
        (event: KeyboardEvent<HTMLInputElement>) => {
            _allKeyDownHandler(event).checkIncludeSymbols()

            if (newStepValue === defaultStep && event.keyCode === 40) {
                event.preventDefault()
            }

            _allKeyDownHandler(event).compareValues(newMaxValue, defaultMin + 2)
            _allKeyDownHandler(event).changeActiveButton("step")
        },
        [newStepValue, defaultStep, defaultMin]
    )
    const buttonPlusHandler = (field: FieldType) => {
        falseStatusStatistics()
        switch (field) {
            case 'max': {
                setNewMaxValue(actual => actual + 1)
                fieldRefs?.max?.current?.focus()
                break
            }
            case 'min': {
                setNewMinValue(actual => actual + 1)
                fieldRefs?.min?.current?.focus()
                break
            }
            case 'step': {
                setNewStepValue(actual => actual + 1)
                fieldRefs?.step?.current?.focus()
                break
            }
        }
    }

    const disabledButtons = {
        maxMinus: newMaxValue < defaultMin + defaultStep + defaultStep,
        maxPLus: newMaxValue === limitValue,
        minMinus: newMinValue === defaultMin,
        minPLus: newMinValue === limitValue,
        stepMinus: newStepValue === defaultMin,
        stepPLus: newStepValue === limitValue - 1
    }

    const buttonMinusHandler = (field: FieldType) => {
        falseStatusStatistics()
        switch (field) {
            case 'max': {
                !disabledButtons.maxMinus && setNewMaxValue(actual => actual - 1)
                fieldRefs?.max?.current?.focus()
                break
            }
            case 'min': {
                !disabledButtons.minMinus && setNewMinValue(actual => actual - 1)
                fieldRefs?.min?.current?.focus()
                break
            }
            case 'step': {
                !disabledButtons.stepMinus && setNewStepValue(actual => actual - 1)
                fieldRefs?.step?.current?.focus()
            }
        }
    }

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

    const setValueChangeHandler = (event: ChangeEvent<HTMLInputElement>, field: 'max' | 'min', setValue: (value: number) => void) => {
        if (Number(event.currentTarget.value) > limitValue) {
            setErrors(errors => {
                return field === 'max' ?  {...errors, max: errorMessageLength} : {...errors, min: errorMessageLength}
            })

            if (Array.from(event.currentTarget.value).length <= String(limitValue).split('').length) {
                setValue(Number(event.currentTarget.value))
            }
        } else {
            setValue(Number(event.currentTarget.value))
        }
    }

    const maxOnChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChangeHandler(event)
            setValueChangeHandler(event, 'max', setNewMaxValue)
        },
        [limitValue]
    )

    const minOnChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChangeHandler(event)
            setValueChangeHandler(event, 'min', setNewMinValue)
        },
        [limitValue]
    )

    const stepOnChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            onChangeHandler(event)

            if (event.currentTarget.value.length > 3) {
                setNewStepValue(newStepValue)
            } else
                if (Number(event.currentTarget.value) < defaultStep) {
                setErrors( errors => ( { ...errors, step: errorMessageDenyStep}) )
                setNewStepValue(Number(event.currentTarget.value))
            } else {
                setNewStepValue(Number(event.currentTarget.value))
            }
        },
        [newStepValue]
    )

    const saveSettings = useCallback((max: number, min: number, step: number) => {
        setNewMaxValue(max)
        setNewMinValue(min)
        setNewStepValue(step)

        dispatch(setValueAC('maxValue', max))
        dispatch(setValueAC('minValue', min))
        dispatch(setValueAC('stepValue', step))
        dispatch(setValueAC('counter', min))

        dispatch(changeStatusStatisticsAC(true))
        dispatch(resetStatisticsAC())
    }, [])

    // todo: rename click settings
    const clickSaveSettings = useCallback(() => {
        saveSettings(newMaxValue, newMinValue, newStepValue)
        callbackForNotification(notificationSave)
    }, [
        newMaxValue,
        newMinValue,
        newStepValue,
    ])

    const defaultSettings = useCallback(() => {
        saveSettings(defaultMax, defaultMin, defaultStep)
        callbackForNotification(notificationDefault)
        setErrors(initialErrors)
    }, [
        defaultMax,
        defaultMin,
        defaultStep,
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
    ])

    return {
        isDopClassForButton,
        changeHandlers: {max: maxOnChangeHandler, min: minOnChangeHandler, step: stepOnChangeHandler},
        keyDownHandlers: {max: maxKeyDownHandler, min: minKeyDownHandler, step: stepKeyDownHandler},
        newValues: { max: newMaxValue, min: newMinValue, step: newStepValue },
        warning,
        activeButton,
        saveDisabled,
        defaultDisabled,
        disabledButtons,
        buttonPlusHandler,
        buttonMinusHandler,
        errors,
        fieldRefs,
        resetButtonDopClass,
        defaultSettings,
        randomSettings,
        clickSaveSettings
    }
}