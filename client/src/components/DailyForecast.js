import React from 'react';

import MinIcon from '../img/icons/min.svg';
import MaxIcon from '../img/icons/max.svg';
import WeatherIcon from './WeatherIcon';

import { getPrintableDateTime } from '../utils/getPrintableDateTime';

const DailyForecast = ({ forecast }) => {
	const dateString = getPrintableDateTime(forecast.dateTime).dateString;
	return (
		<div className='daily__forecast'>
			<WeatherIcon className='daily__icon' status={forecast.status} />

			<div className='daily__content'>
				<p className='daily__status'>
					<WeatherIcon className='text__icon' status={forecast.status} />
					<span>
						<strong className='text--primary'>Summary: </strong>
						{forecast.status.split(' ')[0]}
					</span>
				</p>

				<p className='daily__min'>
					<img src={MinIcon} alt='Min' className='text__icon' />
					<span>
						<strong className='text--primary'>Min temp: </strong>
						{forecast.tempC.min}&deg;C ({forecast.tempF.min}&deg;F)
					</span>
				</p>

				<p className='daily__max'>
					<img src={MaxIcon} alt='Max' className='text__icon' />
					<span>
						<strong className='text--primary'>Max temp: </strong>
						{forecast.tempC.max}&deg;C ({forecast.tempF.max}&deg;F)
					</span>
				</p>
			</div>

			<div className='daily__date'>
				<p className='daily__day'>{dateString.split(' ')[0]}</p>
				<p className='daily__dt'>
					{dateString.split(' ')[1]} {dateString.split(' ')[2]}
				</p>
			</div>
		</div>
	);
};

export default DailyForecast;
