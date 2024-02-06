import {
  changeStatusStatistics,
  clickDecreaseButton,
  clickIncreaseButton,
  resetStatistics,
  setStatistics,
  setStatisticsAmountClick,
  setStatisticsAmountNumber,
  statisticsReducer,
  StatisticsStateType,
} from './statisticsReducer'

let startState: StatisticsStateType

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
  const endState = statisticsReducer(startState, changeStatusStatistics(true))

  expect(endState.isRunStatistics).toBe(true)
  expect(startState.isRunStatistics).toBe(false)
})

test('click by increase button', () => {
  const endState = statisticsReducer(startState, clickIncreaseButton())

  expect(endState.amountIncreaseButtonPressed).toBe(startState.amountIncreaseButtonPressed + 1)
})

test('click by decrease button', () => {
  const endState = statisticsReducer(startState, clickDecreaseButton())

  expect(endState.amountDecreaseButtonPressed).toBe(startState.amountDecreaseButtonPressed + 1)
})

test('statistics should be reset', () => {
  const endState = statisticsReducer(startState, resetStatistics())

  expect(endState.amountDecreaseButtonPressed).toBe(0)
  expect(endState.amountIncreaseButtonPressed).toBe(0)
})

test('corrected item for statistics should be set', () => {
  const action = setStatistics('amountIncreaseButtonPressed', 5)
  const endState = statisticsReducer(startState, action)
  expect(endState.amountDecreaseButtonPressed).toBe(0)
  expect(endState.amountIncreaseButtonPressed).toBe(5)
})

test('corrected statistic click should be set', () => {
  const action = setStatisticsAmountClick('statisticsAmountMaxClick', 26, 1, 3)
  const endState = statisticsReducer(startState, action)

  expect(endState.statisticsAmountMaxClick).toBe(9)
})

test('corrected statistic number should be set', () => {
  const action = setStatisticsAmountNumber('statisticsAmountMin', 10, 5)
  const endState = statisticsReducer(startState, action)

  expect(endState.statisticsAmountMin).toBe(5)
})
