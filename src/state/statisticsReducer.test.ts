import {
    changeStatusStatisticsAC, clickDecreaseButtonAC,
    clickIncreaseButtonAC,
    statisticsReducer,
    statisticsStateType
} from "./statisticsReducer";

let startState: statisticsStateType

beforeEach(() => {
    startState = {isRunStatistics: false, decreaseButtonPressed: 0, increaseButtonPressed: 0}
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