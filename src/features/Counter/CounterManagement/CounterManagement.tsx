import React, {FC, memo} from 'react'
import {useCounterManagement} from "./useCounterManagement";
import {CounterManagementButton} from "./CounterManagementButton";

export const CounterManagement: FC = memo(() => {

    const { disabledIncrease, increaseClickHandler, disabledDecrease, decreaseClickHandler, disabledReset, resetClickHandler }
        = useCounterManagement()

  return (
    <div className={'management'}>
        <CounterManagementButton callback={increaseClickHandler} disabled={disabledIncrease} children={'inc'}/>
        <CounterManagementButton callback={decreaseClickHandler} disabled={disabledDecrease} children={'dec'}/>
        <CounterManagementButton callback={resetClickHandler} disabled={disabledReset} children={'res'}/>
    </div>
  )
})
