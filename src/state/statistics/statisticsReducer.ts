export type StatisticsStateType = typeof initialState

type ChangeStatusStatisticsAT = ReturnType<typeof changeStatusStatistics>
type ClickIncreaseButtonAT = ReturnType<typeof clickIncreaseButton>
type ClickDecreaseButtonAT = ReturnType<typeof clickDecreaseButton>
type ResetStatisticsAT = ReturnType<typeof resetStatistics>
type SetStatisticsAT = ReturnType<typeof setStatistics>
type SetStatisticsClickAT = ReturnType<typeof setStatisticsAmountClick>
type SetStatisticsNumberAT = ReturnType<typeof setStatisticsAmountNumber>

type StatisticsActionsType =
  | ChangeStatusStatisticsAT
  | ClickDecreaseButtonAT
  | ClickIncreaseButtonAT
  | ResetStatisticsAT
  | SetStatisticsAT
  | SetStatisticsClickAT
  | SetStatisticsNumberAT

const initialState= {
  amountDecreaseButtonPressed: 0,
  amountIncreaseButtonPressed: 0,
  isRunStatistics: true,
  statisticsAmountMaxClick: 0,
  statisticsAmountMax: 0,
  statisticsAmountMinClick: 0,
  statisticsAmountMin: 0,
}

export const statisticsReducer = (state = initialState, action: StatisticsActionsType): StatisticsStateType => {
  switch (action.type) {
    case 'CHANGE-STATUS-STATISTICS': {
      return { ...state, isRunStatistics: action.status }
    }

    case 'CLICK-INCREASE-BUTTON': {
      return { ...state, amountIncreaseButtonPressed: state.amountIncreaseButtonPressed + 1 }
    }

    case 'CLICK-DECREASE-BUTTON': {
      return { ...state, amountDecreaseButtonPressed: state.amountDecreaseButtonPressed + 1 }
    }

    case 'RESET-STATISTICS': {
      return { ...state, amountDecreaseButtonPressed: 0, amountIncreaseButtonPressed: 0 }
    }

    case 'SET-STATISTICS': {
      return { ...state, [action.value]: action.number }
    }

    case 'SET-STATISTICS-AMOUNT-CLICK': {
      const result = Math.ceil((action.number - action.counter) / action.step)

      return { ...state, [action.clickType]: result }
    }

    case 'SET-STATISTICS-AMOUNT-NUMBER': {
      const result = action.number1 - action.number2
      return { ...state, [action.numberType]: result }
    }
  }

  return state
}

type setValueType = 'amountDecreaseButtonPressed' | 'amountIncreaseButtonPressed'
type clickValueType = 'statisticsAmountMaxClick' | 'statisticsAmountMinClick'
type numberValueType = 'statisticsAmountMax' | 'statisticsAmountMin'

export const changeStatusStatistics = (status: boolean) => ({ status, type: 'CHANGE-STATUS-STATISTICS'  as const})
export const clickIncreaseButton = () => ({ type: 'CLICK-INCREASE-BUTTON' as const})
export const clickDecreaseButton = () => ({ type: 'CLICK-DECREASE-BUTTON' as const})
export const resetStatistics = () => ({ type: 'RESET-STATISTICS' as const})
export const setStatistics = (value: setValueType, number: number) => ({
    type: 'SET-STATISTICS' as const, number, value,
})
export const setStatisticsAmountClick = (clickType: clickValueType, number: number, counter: number, step: number) => ({
    type: 'SET-STATISTICS-AMOUNT-CLICK' as const, clickType, counter, number, step,
})
export const setStatisticsAmountNumber = (numberType: numberValueType, number1: number, number2: number) => {
  return {
    type: 'SET-STATISTICS-AMOUNT-NUMBER' as const, number1, number2, numberType,
  }
}
