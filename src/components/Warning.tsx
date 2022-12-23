import React from 'react';
import './../styles/warning.css'

type WarningPropsType = {
	text: string
}

export const Warning: React.FC<WarningPropsType> = (props) => {
	return (
		<div className='warning'>
			<button className='warning__button' type='button'>
				!
				<span className='sr-only'>Warning</span>
			</button>
			<div className='warning__text'>{props.text}</div>
		</div>
	)
}