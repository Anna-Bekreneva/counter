import {decreaseValueAC, increaseValueAC, setValueAC, valuesReducer, ValuesStateType} from "./valuesReducer";

let startValue: ValuesStateType

beforeEach(() => {
    startValue = {maxValue: 5, minValue: 0, stepValue: 1, counter: 0, defaultMin: 5, defaultMax: 5, defaultStep: 5, limitValue: 300}
})

test('which value should be increase', () => {
    const step = 1
    const action = increaseValueAC('minValue', step)
    const endState = valuesReducer(startValue, action)
    expect(endState.minValue).toBe(startValue.minValue + step)
})

test('which value should be decrease', () => {
    const step = 2
    const action = decreaseValueAC('maxValue', step)
    const endState = valuesReducer(startValue, action)
    expect(endState.maxValue).toBe(startValue.maxValue - step)
})

test('set which value', () => {
    const action = setValueAC('stepValue', 10)
    const endState = valuesReducer(startValue, action)
    expect(endState.stepValue).toBe(10)
})