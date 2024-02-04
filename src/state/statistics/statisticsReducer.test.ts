import {
  changeStatusStatisticsAC,
  clickDecreaseButtonAC,
  clickIncreaseButtonAC,
  resetStatisticsAC,
  setStatisticsAC,
  setStatisticsClickAC,
  setStatisticsNumberAC,
  statisticsReducer,
  statisticsStateType,
} from './statisticsReducer'

let startState: statisticsStateType

beforeEach(() => {
  startState = {
    amountDecreaseButtonPressed: 0,
    amountIncreaseButtonPressed: 0,
    isRunStatistics: false,
    statisticsAmountMaxClick: 0,
    statisticsAmountMax: 0,
    statisticsAmountMinClick: 0,
    statisticsAmountMin: 0,
  }
})

test('status statistics should be changed', () => {
  const endState = statisticsReducer(startState, changeStatusStatisticsAC(true))

  expect(endState.isRunStatistics).toBe(true)
  expect(startState.isRunStatistics).toBe(false)
})

test('click by increase button', () => {
  const endState = statisticsReducer(startState, clickIncreaseButtonAC())

  expect(endState.amountIncreaseButtonPressed).toBe(startState.amountIncreaseButtonPressed + 1)
})

test('click by decrease button', () => {
  const endState = statisticsReducer(startState, clickDecreaseButtonAC())

  expect(endState.amountDecreaseButtonPressed).toBe(startState.amountDecreaseButtonPressed + 1)
})

test('statistics should be reset', () => {
  const endState = statisticsReducer(startState, resetStatisticsAC())

  expect(endState.amountDecreaseButtonPressed).toBe(0)
  expect(endState.amountIncreaseButtonPressed).toBe(0)
})

test('corrected item for statistics should be set', () => {
  const action = setStatisticsAC('increaseButtonPressed', 5)
  const endState = statisticsReducer(startState, action)

  expect(endState.amountDecreaseButtonPressed).toBe(0)
  expect(endState.amountIncreaseButtonPressed).toBe(5)
})

test('corrected statistic click should be set', () => {
  const action = setStatisticsClickAC('statisticsMaxClick', 26, 1, 3)
  const endState = statisticsReducer(startState, action)

  expect(endState.statisticsAmountMaxClick).toBe(9)
})

test('corrected statistic number should be set', () => {
  const action = setStatisticsNumberAC('statisticsMinNumber', 10, 5)
  const endState = statisticsReducer(startState, action)

  expect(endState.statisticsAmountMin).toBe(5)
})
