import React from 'react';

import TempIcon from '../img/icons/temp.svg';
import WeatherIcon from './ui/WeatherIcon';

const CurrentWeather = ({ weather, loading, error }) => (
	<div className='weather'>
		<p className='weather__location'>
			{!loading && !error ? weather.location : 'Please enter a location'}
		</p>
		<p className='weather__status'>
			Current Weather: <strong>{weather.status}</strong>
		</p>

		<WeatherIcon status={weather.status} className='weather__icon' />
		<small className='weather__attrib'>
			Icons made by
			<a
				href='https://www.flaticon.com/authors/freepik'
				title='Freepik'
				className='link link--alt'
			>
				{' '}
				Freepik
			</a>{' '}
			from
			<a
				href='https://www.flaticon.com/'
				title='Flaticon'
				className='link link--alt'
			>
				{' '}
				www.flaticon.com
			</a>
		</small>

		{!loading && !error && weather ? (
			<p className='weather__summary'>
				It is currently
				<img src={TempIcon} alt='Temp' className='text__icon' />
				<span className>
					{weather.tempC}&deg;C ({weather.tempF}&deg;F)
				</span>{' '}
				and it feels like
				<img src={TempIcon} alt='Temp' className='text__icon' />
				<span className>
					{weather.feelsLikeC}&deg;C ({weather.feelsLikeF}&deg;F)
				</span>
				.
				<br />
				The humidity is <strong>{weather.humidity}</strong>.
			</p>
		) : null}

		{loading ? <p className='weather__summary'>Loading...</p> : null}
		{error ? (
			<p className='weather__summary'>
				Unable to fetch weather information at the moment. Please ensure you've
				provided a valid location and try again later.
			</p>
		) : null}
	</div>
);

export default CurrentWeather;
