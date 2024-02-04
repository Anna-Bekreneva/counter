import React, { memo } from 'react'

import './../../styles/remained.css'

type PropsType = {
  buttonText: string
  remained: () => void
  text: string
}

export const Remained: React.FC<PropsType> = memo(( { text, remained, buttonText} ) => {
  return (
    <div className={'remained'}>
      <span className={'remained__text'}>{text}</span>
      <button className={'remained__button button'} onClick={remained} type={'button'}>
        {buttonText}
      </button>
    </div>
  )
})
