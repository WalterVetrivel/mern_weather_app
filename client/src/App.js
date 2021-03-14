import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Watermark from './components/ui/Watermark';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';

const App = () => {
	const initLoginDetails = { email: '', password: '' };
	const initRegisterDetails = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const [showLogin, setShowLogin] = useState(false);
	const [loginDetails, setLoginDetails] = useState(initLoginDetails);
	const [showRegister, setShowRegister] = useState(false);
	const [registerDetails, setRegisterDetails] = useState(initRegisterDetails);
	const [loginError, setLoginError] = useState(false);
	const [registerError, setRegisterError] = useState(false);

	const [auth, setAuth] = useState({ isAuth: false, authToken: null });

	useEffect(() => {
		const isAuth = localStorage.getItem('isAuth');
		if (isAuth === 'true') {
			const authToken = localStorage.getItem('authToken');
			setAuth({ isAuth, authToken });
		} else {
			setAuth({ isAuth: false, authToken: null });
		}
	}, []);

	// Login form controls
	const showLoginForm = () => {
		setShowLogin(true);
	};

	const hideLoginForm = () => {
		setLoginDetails(initLoginDetails);
		setLoginError(false);
		setShowLogin(false);
	};

	const loginDetailsChange = e => {
		const newLoginDetails = { ...loginDetails };
		newLoginDetails[e.target.name] = e.target.value;
		setLoginDetails(newLoginDetails);
	};

	// Login process
	const onLogin = async e => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:8000/auth/login', {
				...loginDetails,
			});

			setAuth({ isAuth: true, authToken: res.data.authToken });

			localStorage.setItem('isAuth', 'true');
			localStorage.setItem('authToken', res.data.authToken);
			localStorage.setItem('name', res.data.name);

			hideLoginForm();
		} catch (err) {
			setLoginError(true);
		}
	};

	// Logout
	const logout = e => {
		localStorage.removeItem('isAuth');
		localStorage.removeItem('authToken');
		setAuth({ isAuth: false, authToken: null });
	};

	// Registration form controls
	const showRegisterForm = () => {
		setShowRegister(true);
	};

	const hideRegisterForm = () => {
		setRegisterDetails(initRegisterDetails);
		setRegisterError(false);
		setShowRegister(false);
	};

	const registerDetailsChange = e => {
		const newRegisterDetails = { ...registerDetails };
		newRegisterDetails[e.target.name] = e.target.value;
		setRegisterDetails(newRegisterDetails);
	};

	// Registration process
	const onRegister = async e => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:8000/auth/register', {
				...registerDetails,
			});

			setAuth({ isAuth: true, authToken: res.data.authToken });

			localStorage.setItem('isAuth', 'true');
			localStorage.setItem('authToken', res.data.authToken);
			localStorage.setItem('name', registerDetails.name);

			hideRegisterForm();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className='body__content'>
			<Router>
				{showLogin ? (
					<Login
						onDismiss={hideLoginForm}
						onSubmit={onLogin}
						details={loginDetails}
						loginDetailsChange={loginDetailsChange}
						error={loginError}
					/>
				) : null}
				{showRegister ? (
					<Register
						onDismiss={hideRegisterForm}
						onSubmit={onRegister}
						details={registerDetails}
						registerDetailsChange={registerDetailsChange}
					/>
				) : null}

				<div className='content'>
					<Navbar
						isAuth={auth.isAuth}
						onClickLogin={showLoginForm}
						onClickRegister={showRegisterForm}
						logout={logout}
					/>

					<section className='main'>
						<Switch>
							<Route path='/about'>
								<AboutPage />
							</Route>
							<Route path='/'>
								<HomePage isAuth={auth.isAuth} />
							</Route>
						</Switch>
					</section>

					<Footer />
				</div>
			</Router>
			<Watermark />
		</div>
	);
};

export default App;
