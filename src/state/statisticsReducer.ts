export type statisticsStateType = {
    isRunStatistics: boolean
    increaseButtonPressed: number
    decreaseButtonPressed: number
}

type ChangeStatusStatisticsAT = ReturnType<typeof changeStatusStatisticsAC>
type ClickIncreaseButtonAT = ReturnType<typeof clickIncreaseButtonAC>
type ClickDecreaseButtonAT = ReturnType<typeof clickDecreaseButtonAC>

type ActionsTypes = ChangeStatusStatisticsAT | ClickIncreaseButtonAT | ClickDecreaseButtonAT

const initialState: statisticsStateType = {isRunStatistics: false, decreaseButtonPressed: 0, increaseButtonPressed: 0}

export const statisticsReducer = (state: statisticsStateType = initialState, action: ActionsTypes): statisticsStateType => {
    switch (action.type) {
        case "CHANGE-STATUS-STATISTICS": {
            return {...state, isRunStatistics : action.status}
        }

        case "CLICK-INCREASE-BUTTON": {
            return {...state, increaseButtonPressed : state.increaseButtonPressed + 1}
        }

        case "CLICK-DECREASE-BUTTON": {
            return {...state, decreaseButtonPressed : state.decreaseButtonPressed + 1}
        }
    }
    return state
}

export const changeStatusStatisticsAC = (status: boolean) => ({type: "CHANGE-STATUS-STATISTICS", status} as const)
export const clickIncreaseButtonAC = () => ({type: "CLICK-INCREASE-BUTTON"} as const)
export const clickDecreaseButtonAC = () => ({type: "CLICK-DECREASE-BUTTON"} as const)
