export type statisticsStateType = {
    isRunStatistics: boolean
    increaseButtonPressed: number
    decreaseButtonPressed: number
    statisticsMaxClick: number
    statisticsMinClick: number
    statisticsMaxNumber: number
    statisticsMinNumber: number
}

type ChangeStatusStatisticsAT = ReturnType<typeof changeStatusStatisticsAC>
type ClickIncreaseButtonAT = ReturnType<typeof clickIncreaseButtonAC>
type ClickDecreaseButtonAT = ReturnType<typeof clickDecreaseButtonAC>
type ResetStatisticsAT = ReturnType<typeof resetStatisticsAC>
type SetStatisticsAT = ReturnType<typeof setStatisticsAC>
type SetStatisticsClickAT = ReturnType<typeof setStatisticsClickAC>
type SetStatisticsNumberAT = ReturnType<typeof setStatisticsNumberAC>

type ActionsTypes = ChangeStatusStatisticsAT
	| ClickIncreaseButtonAT
	| ClickDecreaseButtonAT
	| ResetStatisticsAT
	| SetStatisticsAT
	| SetStatisticsClickAT
	| SetStatisticsNumberAT

const initialState: statisticsStateType = {
	isRunStatistics: true,
	decreaseButtonPressed: 0,
	increaseButtonPressed: 0,
	statisticsMaxClick: 0,
	statisticsMaxNumber: 0,
	statisticsMinClick: 0,
	statisticsMinNumber: 0
}

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

        case 'RESET-STATISTICS': {
            return {...state, increaseButtonPressed: 0, decreaseButtonPressed: 0}
        }

        case 'SET-STATISTICS': {}
            return { ...state, [action.value] : action.number}

		case 'SET-STATISTICS-CLICK': {
			const result = Math.ceil((action.number - action.counter) / action.step)
			return {...state, [action.clickType] : result}
		}

		case 'SET-STATISTICS-NUMBER': {
			const result = action.number1 - action.number2
			return {...state, [action.numberType] : result}
		}
	}
    return state
}

type setValueType = 'increaseButtonPressed' | 'decreaseButtonPressed'
type clickValueType = 'statisticsMaxClick' | 'statisticsMinClick'
type numberValueType = 'statisticsMaxNumber' | 'statisticsMinNumber'

export const changeStatusStatisticsAC = (status: boolean) => ({type: "CHANGE-STATUS-STATISTICS", status} as const)
export const clickIncreaseButtonAC = () => ({type: "CLICK-INCREASE-BUTTON"} as const)
export const clickDecreaseButtonAC = () => ({type: "CLICK-DECREASE-BUTTON"} as const)
export const resetStatisticsAC = () => ({type: "RESET-STATISTICS"} as const)
export const setStatisticsAC = (value: setValueType, number: number) => ({type: "SET-STATISTICS", value, number} as const)
export const setStatisticsClickAC = (clickType: clickValueType, number: number, counter: number, step: number) => ({type: "SET-STATISTICS-CLICK", clickType, number, counter, step} as const)
export const setStatisticsNumberAC = (numberType: numberValueType, number1: number, number2: number) => ({type: "SET-STATISTICS-NUMBER", numberType, number1, number2} as const)
