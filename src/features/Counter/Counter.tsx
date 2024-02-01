import React, {FC, memo} from 'react'

import { CounterManagement } from './CounterManagement'
import { Statistics } from './Statistics'
import { Tablo } from './Tablo'

export const Counter: FC = memo(props => {
  return (
    <div className={'counter'}>
      <h2 className={'title'}>Tablo</h2>
      <Statistics />
      <Tablo />
      <CounterManagement />
    </div>
  )
})
