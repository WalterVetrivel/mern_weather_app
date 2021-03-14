import React from 'react';

import TempIcon from '../img/icons/temp.svg';
import WeatherIcon from './ui/WeatherIcon';

import { getPrintableDateTime } from '../utils/getPrintableDateTime';

const HourlyForecast = ({ forecast }) => (
	<div className='hourly__forecast'>
		<p className='hourly__time'>
			{forecast && getPrintableDateTime(forecast.dateTime).timeString}
		</p>
		<p className='hourly__temp'>
			<img src={TempIcon} alt='temp' className='text__icon' />
			{forecast.tempC}&deg;C
		</p>
		<p className='hourly__status'>
			<WeatherIcon className='text__icon' status={forecast.status} />
			{forecast.status.split(' ')[0]}
		</p>
	</div>
);

export default HourlyForecast;
