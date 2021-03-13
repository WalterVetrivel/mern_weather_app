const axios = require('axios');

const celsiusToFahrenheit = tempC => {
	return Math.round(tempC * (9 / 5) + 32);
};

const constructWeatherObject = weather => {
	return {
		dateTime: new Date(weather.dt * 1000),
		tempC: !isNaN(weather.temp)
			? Math.round(weather.temp)
			: {
					min: Math.round(weather.temp.min),
					max: Math.round(weather.temp.max),
			  },
		feelsLikeC: !isNaN(weather.feels_like)
			? Math.round(weather.feels_like)
			: null,
		humidity: Math.round(weather.humidity),
		status: `${weather.weather[0].main} (${weather.weather[0].description})`,
		tempF: !isNaN(weather.temp)
			? celsiusToFahrenheit(weather.temp)
			: {
					min: celsiusToFahrenheit(weather.temp.min),
					max: celsiusToFahrenheit(weather.temp.max),
			  },
		feelsLikeF: !isNaN(weather.feels_like)
			? celsiusToFahrenheit(weather.feels_like)
			: null,
	};
};

exports.getWeather = async (lon, lat) => {
	try {
		const response = await axios.get(
			`${process.env.WEATHER_API_BASE_URL}?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${process.env.WEATHER_API_KEY}`
		);

		const weatherData = response.data;

		const weather = {
			current: constructWeatherObject(weatherData.current),
			hourly: weatherData.hourly
				.slice(1, 6)
				.map(w => constructWeatherObject(w)),
			daily: weatherData.daily.slice(1, 8).map(w => constructWeatherObject(w)),
		};

		return weather;
	} catch (err) {
		throw new Error('weather');
	}
};
