export type ValuesStateType = {
  counter: number
  defaultMax: number
  defaultMin: number
  defaultStep: number
  limitValue: number
  maxValue: number
  minValue: number
  stepValue: number
}

type IncreaseValueAT = ReturnType<typeof increaseValueAC>
type DecreaseValueAT = ReturnType<typeof decreaseValueAC>
type SetValueAT = ReturnType<typeof setValueAC>

type ValuesActionsType = DecreaseValueAT | IncreaseValueAT | SetValueAT

const initialState: ValuesStateType = {
  counter: 0,
  defaultMax: 5,
  defaultMin: 0,
  defaultStep: 1,
  limitValue: 300,
  maxValue: 5,
  minValue: 0,
  stepValue: 1,
}

export const valuesReducer = (
  state: ValuesStateType = initialState,
  action: ValuesActionsType
): ValuesStateType => {
  switch (action.type) {
    case 'INCREASE-VALUE': {
      return { ...state, [action.value]: state[action.value] + action.step }
    }

    case 'DECREASE-VALUE': {
      return { ...state, [action.value]: state[action.value] - action.step }
    }

    case 'SET-VALUE': {
      return { ...state, [action.value]: action.newValue }
    }
  }

  return state
}

export type ValueType = 'counter' | 'maxValue' | 'minValue' | 'stepValue'

export const increaseValueAC = (value: ValueType, step: number) =>
  ({ step, type: 'INCREASE-VALUE', value }) as const
export const decreaseValueAC = (value: ValueType, step: number) =>
  ({ step, type: 'DECREASE-VALUE', value }) as const
export const setValueAC = (value: ValueType, newValue: number) =>
  ({ newValue, type: 'SET-VALUE', value }) as const
