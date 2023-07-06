import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './components/css/Loader.css';

const Navba = lazy(() => import('./components/layout/Navbar'));
const Footer = lazy(() => import('./components/layout/Footer'));
const Home = lazy(() => import('./components/layout/Home'));
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const RiskForm = lazy(() => import('./components/forms/RiskForm'));

function App() {
	return (
		<BrowserRouter>
		<div className="App">
			<Suspense fallback={
				<div className='codepad-logo'>
					<div className='logo'></div>
				</div>
			}>
			<Navba />
			<div className='content' style={{ marginTop: "25vh" }}>
				<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/dashboard">
					<Dashboard />
				</Route>
				<Route path="/riskform">
					<RiskForm />
				</Route>
				</Switch>
			</div>
			<Footer />
			</Suspense>
		</div>
		</BrowserRouter>
	);
}

export default App;
