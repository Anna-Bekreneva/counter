import {useDispatch} from "react-redux";
import {
    selectCounterValue,
    selectMaxValue,
    selectMinValue,
    selectStepValue,
    setValueAC,
    useAppSelector
} from "../../../state";
import {useCallback} from "react";

export const useTablo = () => {
    const dispatch = useDispatch()
    const maxValue = useAppSelector(selectMaxValue)
    const minValue = useAppSelector(selectMinValue)
    const counter = useAppSelector(selectCounterValue)
    const stepValue = useAppSelector(selectStepValue)

    const isRemainedMax = counter !== maxValue && counter + stepValue > maxValue
    const remainedMax = useCallback(() => dispatch(setValueAC('counter', maxValue)), [maxValue])

    const remained = useCallback(() => isRemainedMax && remainedMax(), [remainedMax, isRemainedMax])

    return { counter, maxValue, minValue, isRemainedMax, remained  }
}