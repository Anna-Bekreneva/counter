import React, {FC, memo, useState} from 'react'

import { Notification, SettingsForm } from './'

export const Settings: FC = memo(props => {
  const [notification, setNotification] = useState('You can manage settings')

  return (
    <div className={'settings'}>
      <h2 className={'title'}>Settings</h2>
      <Notification text={notification} />
      <SettingsForm
        setNotification={setNotification}
        notification={notification}
      />
    </div>
  )
})
