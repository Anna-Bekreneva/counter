import React, {FC, memo} from 'react'

type PropsType = {
  buttonText: string
  remained: () => void
  text: string
}

export const Remained: FC<PropsType> = memo(( { text, remained, buttonText} ) => {
  return (
    <div className={'remained'}>
      <span className={'remained__text'}>{text}</span>
      <button className={'remained__button button'} onClick={remained} type={'button'}>
        {buttonText}
      </button>
    </div>
  )
})
