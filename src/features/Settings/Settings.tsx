import React, {FC, memo, useCallback, useState} from 'react'

import { Notification, SettingsForm } from './'

export const Settings: FC = memo(props => {
  const [notificationText, setNotificationText] = useState('You can manage settings')

  const callbackForNotification = useCallback((text: string) => setNotificationText(text), [])

  return (
    <div className={'settings'}>
      <h2 className={'title'}>Settings</h2>
      <Notification text={notificationText} />
      <SettingsForm
        callbackForNotification={callbackForNotification}
        notificationText={notificationText}
      />
    </div>
  )
})
