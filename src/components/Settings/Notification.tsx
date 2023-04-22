import React, {memo} from 'react';

type NotificationPropsType = {
	text: string
}

export const Notification: React.FC<NotificationPropsType> = memo((props) => {
	return (
		<div className='tablo tablo--mini'>
			<p>{props.text}</p>
		</div>
	)
})