import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Watermark from './components/Watermark';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';

const App = () => {
	return (
		<div className='body__content'>
			<Router>
				<Sidebar />
				<div className='content'>
					<Navbar />
					<div className='container'>
						<section className='main'>
							<Switch>
								<Route path='/about'>
									<AboutPage />
								</Route>
								<Route path='/'>
									<HomePage />
								</Route>
							</Switch>
						</section>
					</div>
					<Footer />
				</div>
			</Router>
			<Watermark />
		</div>
	);
};

export default App;
