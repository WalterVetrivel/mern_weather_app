import React from 'react';
import Modal from '../ui/Modal';

const Login = ({ onSubmit, onDismiss, details, loginDetailsChange, error }) => (
	<Modal title='Login' onDismiss={onDismiss}>
		<form onSubmit={onSubmit}>
			<div className='mb-1'>
				<label htmlFor='email'>Email</label>
				<input
					className='input'
					type='email'
					id='email'
					name='email'
					value={details.email}
					onChange={loginDetailsChange}
					placeholder='Eg. test@test.com'
					required
				/>
			</div>

			<div>
				<label htmlFor='password'>Password</label>
				<input
					className='input'
					type='password'
					id='password'
					name='password'
					placeholder='------'
					value={details.password}
					onChange={loginDetailsChange}
					required
				/>
			</div>

			{error ? (
				<div className='mt-1'>
					<p className='text--error text--center'>Invalid email or password.</p>
				</div>
			) : null}

			<div className='flex flex--reverse mt-2'>
				<button type='submit' className='btn btn--primary ml-2'>
					Login
				</button>
				<button className='btn btn--secondary' onClick={onDismiss}>
					Cancel
				</button>
			</div>
		</form>
	</Modal>
);

export default Login;
