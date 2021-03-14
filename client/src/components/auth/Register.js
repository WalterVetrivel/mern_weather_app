import React from 'react';
import Modal from '../ui/Modal';

const Register = ({
	onSubmit,
	onDismiss,
	details,
	registerDetailsChange,
	error,
}) => (
	<Modal title='Register' onDismiss={onDismiss}>
		<form onSubmit={onSubmit}>
			<div className='mb-1'>
				<label htmlFor='name'>Name</label>
				<input
					className='input'
					type='text'
					id='name'
					name='name'
					value={details.name}
					onChange={registerDetailsChange}
					placeholder='Eg. John'
					required
				/>
			</div>

			<div className='mb-1'>
				<label htmlFor='email'>Email</label>
				<input
					className='input'
					type='email'
					id='email'
					name='email'
					value={details.email}
					onChange={registerDetailsChange}
					placeholder='Eg. test@test.com'
					required
				/>
			</div>

			<div className='mb-1'>
				<label htmlFor='password'>Password</label>
				<input
					className='input'
					type='password'
					id='password'
					name='password'
					value={details.password}
					onChange={registerDetailsChange}
					placeholder='Must be at least 8 characters long'
					required
				/>
			</div>

			<div>
				<label htmlFor='confirmPassword'>Confirm Password</label>
				<input
					className='input'
					type='password'
					id='confirmPassword'
					name='confirmPassword'
					value={details.confirmPassword}
					onChange={registerDetailsChange}
					placeholder='Must match the password'
					required
				/>
			</div>

			<div className='flex flex--reverse mt-2'>
				<button className='btn btn--primary ml-2'>Register</button>
				<button className='btn btn--secondary' onClick={onDismiss}>
					Cancel
				</button>
			</div>
		</form>
	</Modal>
);

export default Register;
