import {useDispatch} from "react-redux";
import {
    changeStatusStatisticsAC,
    selectAmountDecreaseButtonPressed,
    selectAmountIncreaseButtonPressed, selectCounterValue,
    selectIsRunStatistics, selectMaxValue, selectMinValue,
    selectStatisticsAmountMax,
    selectStatisticsAmountMaxClick,
    selectStatisticsAmountMin,
    selectStatisticsAmountMinClick, selectStepValue, setStatisticsAC, setStatisticsClickAC, setStatisticsNumberAC,
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
        dispatch(setStatisticsNumberAC('statisticsMaxNumber', maxNumber, counter))
        dispatch(setStatisticsClickAC('statisticsMaxClick', maxNumber, counter, stepNumber))

        return () => {}
    }, [counter, maxNumber])

    useEffect(() => {
        dispatch(setStatisticsNumberAC('statisticsMinNumber', counter, minNumber))
        dispatch(setStatisticsClickAC('statisticsMinClick', counter, minNumber, stepNumber))

        return () => {}
    }, [counter, minNumber])

    useEffect(() => {
        if (isRunStatistics) {
            dispatch(changeStatusStatisticsAC(isRunStatistics))
        }

        if (amountIncreaseButtonPressed) {
            dispatch(setStatisticsAC('increaseButtonPressed', Number(amountIncreaseButtonPressed)))
        }

        if (amountDecreaseButtonPressed) {
            dispatch(setStatisticsAC('decreaseButtonPressed', Number(amountDecreaseButtonPressed)))
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