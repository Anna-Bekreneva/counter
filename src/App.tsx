import React from 'react'

import { Counter } from './features'
import { Settings } from './features'

function App() {
  return (
    <div className={'wrapper'}>
      <div className={'container'}>
        <h1 className={'heading'}>Counter</h1>
        <div className={'wrapper__container'}>
          <Settings/>
          <Counter/>
        </div>
      </div>
    </div>
  )
}

export default App
