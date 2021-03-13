import React from 'react';

import SunnyIcon from '../img/icons/sun.svg';
import CloudyIcon from '../img/icons/cloudy.svg';
import CloudsIcon from '../img/icons/clouds.svg';
import RainIcon from '../img/icons/rain.svg';
import SnowIcon from '../img/icons/snowflake.svg';
import ThunderIcon from '../img/icons/bolt.svg';
import HailIcon from '../img/icons/hail.svg';
import WindIcon from '../img/icons/wind.svg';
import LoadingIcon from '../img/icons/loading.svg';
import ErrorIcon from '../img/icons/error.svg';

const WeatherIcon = ({ status, className }) => {
	let icon = null;

	if (status.includes('sun')) icon = SunnyIcon;
	else if (status.includes('partly')) icon = CloudyIcon;
	else if (status.includes('cloud') || status.includes('overcast'))
		icon = CloudsIcon;
	else if (status.includes('rain')) icon = RainIcon;
	else if (status.includes('snow')) icon = SnowIcon;
	else if (status.includes('thunder')) icon = ThunderIcon;
	else if (status.includes('hail')) icon = HailIcon;
	else if (status.includes('wind')) icon = WindIcon;
	else if (status.includes('loading')) icon = LoadingIcon;
	else if (status.includes('unknown') || status.includes('error'))
		icon = ErrorIcon;
	else icon = SunnyIcon;

	return <img src={icon} alt={status} className={className} />;
};

export default WeatherIcon;
