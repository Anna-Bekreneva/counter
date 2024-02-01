import React, {FC, memo} from 'react'

type NotificationPropsType = {
  text: string
}

export const Notification: FC<NotificationPropsType> = memo(({text}) => {
  return (
    <div className={'tablo tablo--mini'}>
      <p>{text}</p>
    </div>
  )
})
