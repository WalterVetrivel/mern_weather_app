import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	const navbarLinks = [
		{
			to: '/about',
			label: 'About',
		},
	];

	return (
		<nav className='navbar'>
			<div className='container--flex'>
				<Link className='navbar__logo' to='/'>
					Weather App
				</Link>

				<ul className='navbar__nav'>
					{navbarLinks.map(({ to, label }, index) => (
						<li className='navbar__item' key={index}>
							<Link className='navbar__link' to={to}>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
