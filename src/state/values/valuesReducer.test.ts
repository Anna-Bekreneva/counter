import {
  ValuesStateType,
  decreaseValueAC,
  increaseValueAC,
  setValueAC,
  valuesReducer,
} from './valuesReducer'

let startValue: ValuesStateType

beforeEach(() => {
  startValue = {
    counter: 0,
    defaultMax: 5,
    defaultMin: 5,
    defaultStep: 5,
    limitValue: 300,
    maxValue: 5,
    minValue: 0,
    stepValue: 1,
  }
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
