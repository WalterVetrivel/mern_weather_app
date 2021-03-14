import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = ({ isAuth, selectLocation }) => {
	const [homeLocation, setHomeLocation] = useState('');
	const [newHomeLocation, setNewHomeLocation] = useState('');
	const [savedLocations, setSavedLocations] = useState([]);
	const [newSavedLocation, setNewSavedLocation] = useState('');

	useEffect(() => {
		if (localStorage.getItem('isAuth') === 'true') {
			setInitialHomeLocation();
			setInitialSavedLocations();
		}
	}, [isAuth]);

	const changeHomeLocation = e => {
		setNewHomeLocation(e.target.value);
	};

	const changeNewSavedLocation = e => {
		setNewSavedLocation(e.target.value);
	};

	const setInitialHomeLocation = async () => {
		try {
			const res = await axios.get('http://localhost:8000/location/home', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			});
			setHomeLocation(res.data.homeLocation);
		} catch (err) {
			console.error(err);
		}
	};

	const setInitialSavedLocations = async () => {
		try {
			const res = await axios.get('http://localhost:8000/location/saved', {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('authToken')}`,
				},
			});
			setSavedLocations(res.data.savedLocations);
		} catch (err) {
			console.error(err);
		}
	};

	const updateHomeLocation = async e => {
		e.preventDefault();

		try {
			const res = await axios.post(
				'http://localhost:8000/location/home',
				{
					newHomeLocation: newHomeLocation,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authToken')}`,
					},
				}
			);
			setHomeLocation(res.data.homeLocation);
			setNewHomeLocation('');
		} catch (err) {
			console.error(err);
		}
	};

	const addNewSavedLocation = async e => {
		e.preventDefault();

		try {
			const res = await axios.post(
				'http://localhost:8000/location/saved',
				{
					newLocation: newSavedLocation,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authToken')}`,
					},
				}
			);
			setSavedLocations(res.data.savedLocations);
			setNewSavedLocation('');
		} catch (err) {
			console.error(err);
		}
	};

	const deleteSavedLocation = async e => {
		e.stopPropagation();

		try {
			const res = await axios.delete(
				`http://localhost:8000/location/saved/${e.target.value}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('authToken')}`,
					},
				}
			);

			if (res.data.message === 'Deleted') {
				setSavedLocations(res.data.savedLocations);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='sidebar'>
			{!isAuth ? (
				<div className='sidebar__login'>
					<p className='sidebar__text'>
						Login or signup to view your locations
					</p>
				</div>
			) : (
				<div className='sidebar__locations'>
					<div className='mb-2'>
						<h3>
							Welcome, <span>{localStorage.getItem('name')}</span>
						</h3>
					</div>

					<div className='sidebar__home'>
						<h3 className='sidebar__title'>Home Location</h3>
						{homeLocation && homeLocation !== '' ? (
							<p className='sidebar__location mb-1' onClick={selectLocation}>
								{homeLocation}
							</p>
						) : null}

						<form onSubmit={updateHomeLocation}>
							<div className='form__group'>
								<input
									type='text'
									className='input input--sm mb-1'
									id='home'
									name='home'
									value={newHomeLocation}
									onChange={changeHomeLocation}
									placeholder='Eg. Canberra'
									required
								/>
								<button className='btn btn--primary btn--sm'>Update</button>
							</div>
						</form>
					</div>

					<div className='sidebar__saved mt-2'>
						<h3 className='sidebar__title'>Saved Locations</h3>

						{savedLocations.map(loc => (
							<p className='sidebar__location mb-1' onClick={selectLocation}>
								<span>{loc}</span>
								<button
									className='sidebar__remove'
									value={loc}
									onClick={deleteSavedLocation}
								>
									X
								</button>
							</p>
						))}

						<form onSubmit={addNewSavedLocation} className='mb-1'>
							<div className='form__group'>
								<input
									type='text'
									className='input mb-1 input--sm'
									id='home'
									name='home'
									value={newSavedLocation}
									onChange={changeNewSavedLocation}
									placeholder='Eg. Canberra'
									required
								/>
								<button className='btn btn--primary btn--sm'>Add</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
