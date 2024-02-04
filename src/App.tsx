import React from 'react'

// todo: why so many styles
import './styles/counter.css'
import './styles/global.css'
import './styles/reset.css'
import './styles/settings.css'
import './styles/statistics.css'

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
