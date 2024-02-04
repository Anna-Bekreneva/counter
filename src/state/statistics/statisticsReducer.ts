export type statisticsStateType = {
  amountDecreaseButtonPressed: number
  amountIncreaseButtonPressed: number
  isRunStatistics: boolean
  statisticsAmountMaxClick: number
  statisticsAmountMax: number
  statisticsAmountMinClick: number
  statisticsAmountMin: number
}

type ChangeStatusStatisticsAT = ReturnType<typeof changeStatusStatisticsAC>
type ClickIncreaseButtonAT = ReturnType<typeof clickIncreaseButtonAC>
type ClickDecreaseButtonAT = ReturnType<typeof clickDecreaseButtonAC>
type ResetStatisticsAT = ReturnType<typeof resetStatisticsAC>
type SetStatisticsAT = ReturnType<typeof setStatisticsAC>
type SetStatisticsClickAT = ReturnType<typeof setStatisticsClickAC>
type SetStatisticsNumberAT = ReturnType<typeof setStatisticsNumberAC>

type StatisticsActionsType =
  | ChangeStatusStatisticsAT
  | ClickDecreaseButtonAT
  | ClickIncreaseButtonAT
  | ResetStatisticsAT
  | SetStatisticsAT
  | SetStatisticsClickAT
  | SetStatisticsNumberAT

const initialState: statisticsStateType = {
  amountDecreaseButtonPressed: 0,
  amountIncreaseButtonPressed: 0,
  isRunStatistics: true,
  statisticsAmountMaxClick: 0,
  statisticsAmountMax: 0,
  statisticsAmountMinClick: 0,
  statisticsAmountMin: 0,
}

export const statisticsReducer = (
  state: statisticsStateType = initialState,
  action: StatisticsActionsType
): statisticsStateType => {
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

    case 'SET-STATISTICS-CLICK': {
      const result = Math.ceil((action.number - action.counter) / action.step)

      return { ...state, [action.clickType]: result }
    }

    case 'SET-STATISTICS-NUMBER': {
      const result = action.number1 - action.number2

      return { ...state, [action.numberType]: result }
    }
  }

  return state
}

type setValueType = 'decreaseButtonPressed' | 'increaseButtonPressed'
type clickValueType = 'statisticsMaxClick' | 'statisticsMinClick'
type numberValueType = 'statisticsMaxNumber' | 'statisticsMinNumber'

export const changeStatusStatisticsAC = (status: boolean) =>
  ({ status, type: 'CHANGE-STATUS-STATISTICS' }) as const
export const clickIncreaseButtonAC = () => ({ type: 'CLICK-INCREASE-BUTTON' }) as const
export const clickDecreaseButtonAC = () => ({ type: 'CLICK-DECREASE-BUTTON' }) as const
export const resetStatisticsAC = () => ({ type: 'RESET-STATISTICS' }) as const
export const setStatisticsAC = (value: setValueType, number: number) =>
  ({
    number,
    type: 'SET-STATISTICS',
    value,
  }) as const
export const setStatisticsClickAC = (
  clickType: clickValueType,
  number: number,
  counter: number,
  step: number
) =>
  ({
    clickType,
    counter,
    number,
    step,
    type: 'SET-STATISTICS-CLICK',
  }) as const
export const setStatisticsNumberAC = (
  numberType: numberValueType,
  number1: number,
  number2: number
) =>
  ({
    number1,
    number2,
    numberType,
    type: 'SET-STATISTICS-NUMBER',
  }) as const
