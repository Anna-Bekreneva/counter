import { combineReducers, createStore } from 'redux'

import { loadState, saveState } from '../utils'
import { statisticsReducer } from './statistics'
import { valuesReducer } from './values'
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
  statistics: statisticsReducer,
  values: valuesReducer,
})

let preloadedState
const persistedTodosString = localStorage.getItem('app-state')

if (persistedTodosString) {
  preloadedState = JSON.parse(persistedTodosString)
}

export const store = createStore(rootReducer, loadState())

store.subscribe(() => {
  saveState({
    statistics: store.getState().statistics,
    values: store.getState().values,
  })
  localStorage.setItem('app-state', JSON.stringify(store.getState()))
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
