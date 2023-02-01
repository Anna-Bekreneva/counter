import React from 'react';

type NotificationPropsType = {
	text: string
}

export const Notification: React.FC<NotificationPropsType> = (props) => {
	return (
		<div className='notification'>
			<p>{props.text}</p>
		</div>
	)
}