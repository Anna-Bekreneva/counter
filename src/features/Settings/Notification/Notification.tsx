import React, {FC, memo} from 'react'

type PropsType = {
  text: string
}

export const Notification: FC<PropsType> = memo(({text}) => {
  return (
    <div className={'tablo tablo--mini'}>
      <p>{text}</p>
    </div>
  )
})
