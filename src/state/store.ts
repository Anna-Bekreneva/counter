import {combineReducers, createStore} from "redux";
import {valuesReducer} from "./valuesReducer";
import {statisticsReducer} from "./statisticsReducer";
import {loadState, saveState} from "../utils/localstorage";

const rootReducer = combineReducers({
    values: valuesReducer,
    statistics: statisticsReducer
})

let preloadedState
const persistedTodosString  = localStorage.getItem('app-state')
if (persistedTodosString) {
    preloadedState = JSON.parse(persistedTodosString)
}

export const store = createStore(rootReducer, loadState())

store.subscribe(() => {
    saveState({
        values: store.getState().values,
        statistics: store.getState().statistics,
    })
    localStorage.setItem('app-state', JSON.stringify(store.getState()))
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
