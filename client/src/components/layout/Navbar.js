import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuth, onClickLogin, onClickRegister, logout }) => {
	const navbarLinks = [
		{
			to: '/about',
			label: 'About',
		},
	];

	return (
		<nav className='navbar'>
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

				{!isAuth ? (
					<li className='navbar__item'>
						<button className='btn btn--primary' onClick={onClickLogin}>
							Login
						</button>
					</li>
				) : null}
				{!isAuth ? (
					<li className='navbar__item'>
						<button className='btn btn--secondary' onClick={onClickRegister}>
							Sign up
						</button>
					</li>
				) : null}
				{isAuth ? (
					<li className='navbar__item'>
						<button className='btn btn--secondary' onClick={logout}>
							Logout
						</button>
					</li>
				) : null}
			</ul>
		</nav>
	);
};

export default Navbar;
