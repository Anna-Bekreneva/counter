import {useDispatch} from "react-redux";
import {
    changeStatusStatistics, clickDecreaseButton,
    clickIncreaseButton,
    selectCounterValue,
    selectIsRunStatistics,
    selectMaxValue,
    selectMinValue,
    selectStepValue, setValueAC,
    useAppSelector
} from "../../../state";
import {useCallback} from "react";

export const useCounterManagement = () => {
    const dispatch = useDispatch()
    const maxValue = useAppSelector(selectMaxValue)
    const minValue = useAppSelector(selectMinValue)
    const stepValue = useAppSelector(selectStepValue)
    const counterValue = useAppSelector(selectCounterValue)

    const isRunStatistics = useAppSelector(selectIsRunStatistics)

    const increaseClickHandler = useCallback(() => {
        if (counterValue <= maxValue - stepValue && counterValue >= minValue) {
            dispatch(setValueAC('counter', counterValue + stepValue))
            dispatch(clickIncreaseButton())
            !isRunStatistics && dispatch(changeStatusStatistics(true))
        }
    }, [counterValue, maxValue, stepValue, minValue, isRunStatistics])

    const decreaseClickHandler = useCallback(() => {
        counterValue > minValue && dispatch(setValueAC('counter', counterValue - stepValue))
        dispatch(clickDecreaseButton())
        !isRunStatistics && dispatch(changeStatusStatistics(true))
    }, [counterValue, minValue, stepValue, isRunStatistics])

    const resetClickHandler = useCallback(() => dispatch(setValueAC('counter', minValue)), [minValue])

    const disabledIncrease = counterValue + stepValue > maxValue || counterValue === maxValue
    const disabledDecrease = counterValue - stepValue < minValue || counterValue === minValue
    const disabledReset = counterValue - stepValue === minValue || counterValue === minValue

    return { disabledIncrease, increaseClickHandler, disabledDecrease, decreaseClickHandler, disabledReset, resetClickHandler }
}