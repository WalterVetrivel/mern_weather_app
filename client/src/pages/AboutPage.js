import React from 'react';

const AboutPage = () => {
	const requirements = [
		`Display the current weather and forecast for the next 5 hours and
	next 7 days for selected location.`,
		`Show weather information for current location when app loads.`,
		`Let user type a different location to get weather information.`,
		`Let user use their current location to get weather information.`,
		`Users should be able to register and login.`,
		`Logged in users should be able to set a home location and save other locations.`,
		`Weather for home or saved locations must be displayed upon clicking the location from a list.`,
		`User should be able to update home location and remove saved locations.`,
	];

	const technology = [
		{
			title: 'Front-end',
			main: 'React',
			description:
				'React is a front-end JavaScript framework that helps to break down larger apps into smaller, reactive components.',
			other: [
				{
					name: 'axios',
					purpose: 'Sending HTTP requests to server',
				},
				{
					name: 'react-router-dom',
					purpose: 'For routing',
				},
				{
					name: 'SCSS',
					purpose: 'To make writing CSS easier',
				},
			],
		},
	];

	return (
		<div className='about'>
			<h1 className='heading heading--main text--center'>About App</h1>
			<section className='container'>
				<h1 className='heading heading--main mb-2'>Requirements</h1>
				<ul className='text'>
					{requirements.map((req, index) => (
						<li className='mb-1' key={index}>
							{req}
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default AboutPage;
