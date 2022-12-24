import React from 'react';
import './../../styles/remained.css'

type RemainedPropsType = {
	text: string
	button: string
	remained: () => void
}

export const Remained: React.FC<RemainedPropsType> = (props) => {
	return (
		<div className='remained'>
			<span className='remained__text'>{props.text}</span>
			<button className='remained__button button' type='button' onClick={props.remained}>{props.button}</button>
		</div>
	)
}