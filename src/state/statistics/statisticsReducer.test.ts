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
    decreaseButtonPressed: 0,
    increaseButtonPressed: 0,
    isRunStatistics: false,
    statisticsMaxClick: 0,
    statisticsMaxNumber: 0,
    statisticsMinClick: 0,
    statisticsMinNumber: 0,
  }
})

test('status statistics should be changed', () => {
  const endState = statisticsReducer(startState, changeStatusStatisticsAC(true))

  expect(endState.isRunStatistics).toBe(true)
  expect(startState.isRunStatistics).toBe(false)
})

test('click by increase button', () => {
  const endState = statisticsReducer(startState, clickIncreaseButtonAC())

  expect(endState.increaseButtonPressed).toBe(startState.increaseButtonPressed + 1)
})

test('click by decrease button', () => {
  const endState = statisticsReducer(startState, clickDecreaseButtonAC())

  expect(endState.decreaseButtonPressed).toBe(startState.decreaseButtonPressed + 1)
})

test('statistics should be reset', () => {
  const endState = statisticsReducer(startState, resetStatisticsAC())

  expect(endState.decreaseButtonPressed).toBe(0)
  expect(endState.increaseButtonPressed).toBe(0)
})

test('corrected item for statistics should be set', () => {
  const action = setStatisticsAC('increaseButtonPressed', 5)
  const endState = statisticsReducer(startState, action)

  expect(endState.decreaseButtonPressed).toBe(0)
  expect(endState.increaseButtonPressed).toBe(5)
})

test('corrected statistic click should be set', () => {
  const action = setStatisticsClickAC('statisticsMaxClick', 26, 1, 3)
  const endState = statisticsReducer(startState, action)

  expect(endState.statisticsMaxClick).toBe(9)
})

test('corrected statistic number should be set', () => {
  const action = setStatisticsNumberAC('statisticsMinNumber', 10, 5)
  const endState = statisticsReducer(startState, action)

  expect(endState.statisticsMinNumber).toBe(5)
})
