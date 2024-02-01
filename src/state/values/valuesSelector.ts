import {AppRootStateType} from "../store";
export const selectDefaultMin = (state: AppRootStateType): number => state.values.defaultMin
export const selectDefaultMax = (state: AppRootStateType): number => state.values.defaultMin
export const selectDefaultStep = (state: AppRootStateType): number => state.values.defaultStep
export const selectLimitValue = (state: AppRootStateType): number => state.values.limitValue

export const selectMaxValue = (state: AppRootStateType): number => state.values.maxValue
export const selectMinValue = (state: AppRootStateType): number => state.values.minValue
export const selectStepValue = (state: AppRootStateType): number => state.values.stepValue