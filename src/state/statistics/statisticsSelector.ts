import {AppRootStateType} from "../store";

export const selectIsRunStatistics = (state: AppRootStateType): boolean => state.statistics.isRunStatistics

export const selectAmountIncreaseButtonPressed = (state: AppRootStateType): number => state.statistics.amountIncreaseButtonPressed
export const selectAmountDecreaseButtonPressed = (state: AppRootStateType): number => state.statistics.amountDecreaseButtonPressed
export const selectStatisticsAmountMaxClick = (state: AppRootStateType): number => state.statistics.statisticsAmountMaxClick
export const selectStatisticsAmountMinClick = (state: AppRootStateType): number => state.statistics.statisticsAmountMinClick
export const selectStatisticsAmountMax = (state: AppRootStateType): number => state.statistics.statisticsAmountMax
export const selectStatisticsAmountMin = (state: AppRootStateType): number => state.statistics.statisticsAmountMin

