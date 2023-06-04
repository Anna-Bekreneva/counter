export type ValuesStateType = {
    maxValue: number
    minValue: number
    stepValue: number
    counter: number
    defaultMax: number
    defaultMin: number
    defaultStep: number
    limitValue: number
}

type IncreaseValueAT = ReturnType<typeof increaseValueAC>
type DecreaseValueAT = ReturnType<typeof decreaseValueAC>
type SetValueAT = ReturnType<typeof setValueAC>

type ValuesActionsType = IncreaseValueAT | DecreaseValueAT | SetValueAT

const initialState: ValuesStateType = {maxValue: 5, stepValue: 1, minValue: 0, counter: 0, defaultMin: 0, defaultMax: 5, defaultStep: 1, limitValue: 300}

export const valuesReducer = (state: ValuesStateType = initialState, action: ValuesActionsType): ValuesStateType => {
    switch (action.type) {
        case "INCREASE-VALUE": {
            return {...state, [action.value] : state[action.value] + action.step}
        }

        case "DECREASE-VALUE": {
            return {...state, [action.value] : state[action.value] - action.step}
        }

        case "SET-VALUE": {
            return {...state, [action.value] : action.newValue}
        }
    }
    return state
}

export type ValueType = 'maxValue' | 'minValue' | 'stepValue' | 'counter'

export const increaseValueAC = (value: ValueType, step: number) => ({type: "INCREASE-VALUE", value, step} as const)
export const decreaseValueAC = (value: ValueType, step: number) => ({type: "DECREASE-VALUE", value, step} as const)
export const setValueAC = (value: ValueType, newValue: number) => ({type: "SET-VALUE", value, newValue} as const)
