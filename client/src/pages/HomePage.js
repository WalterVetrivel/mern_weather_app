import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Importing components
import CurrentWeather from '../components/CurrentWeather';
import LocationForm from '../components/LocationForm';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';

// HomePage Component
const HomePage = () => {
	// Initial weather data
	const initWeather = {
		location: '',
		current: {
			status: 'loading',
			tempC: 0,
			tempF: 0,
			feelsLikeC: 0,
			feelsLikeF: 0,
			humidity: 0,
		},
		hourly: [],
		daily: [],
	};

	// Initialising state
	const [location, setLocation] = useState('');
	const [locationIsEmpty, setLocationIsEmpty] = useState(false);
	const [weather, setWeather] = useState(initWeather);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	// Reusable function to set the weather and location data retrieved from the back end
	const setData = data => {
		setWeather({
			...data.weather,
			current: { ...data.weather.current, location: data.location },
		});
		setLocation(data.location);
		setLoading(false);
		setError(false);
	};

	// Reusable function to set the loading state
	const setLoadingState = () => {
		setLoading(true);
		setError(false);
	};

	// Reusable function to set the error state
	const setErrorState = () => {
		setWeather({
			...initWeather,
			current: { ...initWeather.current, status: 'error' },
		});
		setLoading(false);
		setError(true);
	};

	// The useEffect hook is used to load weather information based on IP upon loading the app
	useEffect(() => {
		getWeatherByIp();
	}, []);

	// Handler to update location based on the text input
	const onChangeLocation = async e => {
		setLocation(e.target.value);
	};

	// Functions to get weather information
	// Function to get the weather details based on IP
	const getWeatherByIp = async () => {
		try {
			setLoadingState();

			const ipResponse = await axios.get('https://api.ipify.org/?format=json');
			const res = await axios.get(
				`http://localhost:8000/weather?ip=${ipResponse.data.ip}`
			);

			setData(res.data);
		} catch (err) {
			setErrorState();
		}
	};

	// Function to get the weather information based on address/location entered
	const getWeatherByAddress = async e => {
		e.preventDefault();
		setLoadingState();

		if (location.trim() === '') {
			setLocationIsEmpty(true);
			return;
		}

		try {
			const res = await axios.get(
				`http://localhost:8000/weather?address=${encodeURIComponent(location)}`
			);

			setData(res.data);
		} catch (err) {
			setErrorState();
		}
	};

	// Function to get the weather information based on geolocation
	const getWeatherByGeolocation = async () => {
		const success = async position => {
			try {
				setLoadingState();

				const res = await axios.get(
					`http://localhost:8000/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
				);

				setData(res.data);
			} catch (err) {
				setErrorState();
			}
		};

		const error = async () => {
			await getWeatherByIp();
		};

		if (!navigator.geolocation) {
			alert('Geolocation is not supported by your browser');
		} else {
			navigator.geolocation.getCurrentPosition(success, error);
		}
	};

	// Component JSX code
	return (
		<>
			<div className='home'>
				<LocationForm
					location={location}
					locationChange={onChangeLocation}
					onSubmit={getWeatherByAddress}
					locationIsEmpty={locationIsEmpty}
					onCurrentLocation={getWeatherByGeolocation}
				/>
				<CurrentWeather
					loading={loading}
					error={error}
					weather={weather.current}
				/>
			</div>

			<div className='hourly'>
				<h1 className='heading heading--main'>Next 5 hours</h1>
				{weather.hourly.length > 0 ? (
					<div className='hourly__grid'>
						{weather.hourly.map((h, index) => (
							<HourlyForecast key={index} forecast={h} />
						))}
					</div>
				) : (
					<p className='text--center'>
						Forecast of next 5 hours will be displayed here.
					</p>
				)}
			</div>

			<div className='daily'>
				<h1 className='heading heading--main'>Next 7 days</h1>
				{weather.daily.length > 0 ? (
					<div className='daily__grid'>
						{weather.daily.map((d, index) => (
							<DailyForecast key={index} forecast={d} />
						))}
					</div>
				) : (
					<p className='text--center'>
						Forecast of next 7 days will be displayed here.
					</p>
				)}
			</div>
		</>
	);
};

export default HomePage;
