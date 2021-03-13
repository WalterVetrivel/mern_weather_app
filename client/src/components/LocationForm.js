import React from 'react';

import LocationIcon from '../img/icons/location.svg';
import CrosshairIcon from '../img/icons/crosshair.svg';

const LocationForm = ({
	onSubmit,
	location,
	locationChange,
	locationIsEmpty,
	onCurrentLocation,
}) => (
	<header className='hero'>
		<h1 className='hero__title'>
			Check the current weather anywhere, anytime.
		</h1>
		<p className='hero__subtitle'>
			Is it raining in Canberra? Is it sunny in Sydney? Find out.
		</p>

		<form className='hero__form' onSubmit={onSubmit}>
			<label htmlFor='address'>
				<img src={LocationIcon} alt='pin' className='label__icon' />
				Enter location/address
			</label>

			<div className='form__group'>
				<input
					type='text'
					id='address'
					name='address'
					placeholder='Eg., 0 North Street, Canberra'
					className='input'
					value={location}
					onChange={locationChange}
					required
				/>
				<button type='submit' className='btn btn--primary'>
					Get Weather
				</button>
			</div>

			{locationIsEmpty ? (
				<small className='text--error'>Please enter an address</small>
			) : (
				''
			)}
		</form>

		<div className='hero__current'>
			or&nbsp;&nbsp;
			<button className='btn btn--secondary' onClick={onCurrentLocation}>
				<img src={CrosshairIcon} alt='location' className='btn__icon' />
				Use current location
			</button>
		</div>
	</header>
);

export default LocationForm;
