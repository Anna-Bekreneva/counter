import {useDispatch} from "react-redux";
import {
    changeStatusStatistics,
    selectAmountDecreaseButtonPressed,
    selectAmountIncreaseButtonPressed, selectCounterValue,
    selectIsRunStatistics, selectMaxValue, selectMinValue,
    selectStatisticsAmountMax,
    selectStatisticsAmountMaxClick,
    selectStatisticsAmountMin,
    selectStatisticsAmountMinClick, selectStepValue, setStatistics, setStatisticsAmountClick, setStatisticsAmountNumber,
    useAppSelector
} from "../../../state";
import {useEffect} from "react";

export const useStatistics = () => {
    const dispatch = useDispatch()
    const isRunStatistics = useAppSelector(selectIsRunStatistics)
    const amountIncreaseButtonPressed = useAppSelector(selectAmountIncreaseButtonPressed)
    const amountDecreaseButtonPressed = useAppSelector(selectAmountDecreaseButtonPressed)
    const statisticsAmountMaxClick = useAppSelector(selectStatisticsAmountMaxClick)
    const statisticsAmountMinClick = useAppSelector(selectStatisticsAmountMinClick)
    const statisticsMaxNumber = useAppSelector(selectStatisticsAmountMax)
    const statisticsMinNumber = useAppSelector(selectStatisticsAmountMin)

    const maxNumber = useAppSelector(selectMaxValue)
    const minNumber = useAppSelector(selectMinValue)
    const stepNumber = useAppSelector(selectStepValue)
    const counter = useAppSelector(selectCounterValue)

    useEffect(() => {
        dispatch(setStatisticsAmountNumber('statisticsAmountMax', maxNumber, counter))
        dispatch(setStatisticsAmountClick('statisticsAmountMaxClick', maxNumber, counter, stepNumber))

        return () => {}
    }, [counter, maxNumber, stepNumber])

    useEffect(() => {
        dispatch(setStatisticsAmountNumber('statisticsAmountMin', counter, minNumber))
        dispatch(setStatisticsAmountClick('statisticsAmountMinClick', counter, minNumber, stepNumber))

        return () => {}
    }, [counter, minNumber, stepNumber])

    useEffect(() => {
        if (isRunStatistics) {
            dispatch(changeStatusStatistics(isRunStatistics))
        }

        if (amountIncreaseButtonPressed) {
            dispatch(setStatistics('amountIncreaseButtonPressed', Number(amountIncreaseButtonPressed)))
        }

        if (amountDecreaseButtonPressed) {
            dispatch(setStatistics('amountDecreaseButtonPressed', Number(amountDecreaseButtonPressed)))
        }

        return () => {}
    }, [])

    return {
        isRunStatistics,
        statisticsMaxNumber,
        statisticsAmountMaxClick,
        statisticsMinNumber,
        statisticsAmountMinClick,
        amountIncreaseButtonPressed,
        amountDecreaseButtonPressed
    }
}