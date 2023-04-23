import {combineReducers, createStore} from "redux";
import {valuesReducer} from "./valuesReducer";
import {statisticsReducer} from "./statisticsReducer";

const rootReducer = combineReducers({
    values: valuesReducer,
    statistics: statisticsReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
