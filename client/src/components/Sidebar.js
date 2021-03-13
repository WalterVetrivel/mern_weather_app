import React from 'react';

const Sidebar = () => (
	<div className='sidebar'>
		<h3 className='sidebar__heading'>Locations</h3>
		<p className='sidebar__text'>Login to save your favourite locations</p>
		<button className='btn btn--primary mb-2'>Login</button>
		<p className='sidebar__text'>New user?</p>
		<button className='btn btn--secondary'>Sign up</button>
	</div>
);

export default Sidebar;
