import React from 'react';

type StaticsPropsType = {
	maxNumber: number
	maxClick: number
	minNumber: number
	minClick: number
	isRunStatistics: boolean
	incPressed: number
	decPressed: number
}

export const Statistics: React.FC<StaticsPropsType> = (props) => {

	const result = props.isRunStatistics ?
		<>
			<div className="statistics__left">
				<p className='statistics__text'> up to the max number:
					<span className='statistics__accent'>{' ' + props.maxNumber}</span> and
					<span className='statistics__accent'>{' ' + props.maxClick}</span> click
				</p>
				<p className='statistics__text'> up to the min number:
					<span className='statistics__accent'>{' ' + props.minNumber}</span> and
					<span className='statistics__accent'>{' ' + props.minClick}</span> click
				</p>
			</div>
			<div className='statistics__right'>
				<p className='statistics__text'> the button «inc» was pressed:
					<span className='statistics__accent'>{' ' + props.incPressed}</span>
				</p>
				<p className='statistics__text'> the button «dec» was pressed:
					<span className='statistics__accent'>{' ' + props.decPressed}</span>
				</p>
			</div>
		</>
		: <p className='statistics__default'>stats will be here</p>

	return  <div className='statistics tablo tablo--mini'>{result}</div>
}