import React, { memo } from 'react'

import './../../styles/remained.css'

type RemainedPropsType = {
  button: string
  remained: () => void
  text: string
}

export const Remained: React.FC<RemainedPropsType> = memo(props => {
  return (
    <div className={'remained'}>
      <span className={'remained__text'}>{props.text}</span>
      <button className={'remained__button button'} onClick={props.remained} type={'button'}>
        {props.button}
      </button>
    </div>
  )
})
