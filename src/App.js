import React from 'react';
import logo from './img/tvm-header-logo-2.png';
import './App.css';
import ShowList from './components/ShowList';
import Show from './components/Show';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';

const App = () => {
	return (
		<Router>
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<h1 className='App-title'>
						Welcome to the Movie World!
					</h1>

					<Button
						variant="outlined"
						onClick={() => { window.location.href = '/' }}
						sx={{
							margin: '10px',
							padding: '5px',
							width: '120px',
							height: '40px',
							borderRadius: '20px',
							color: 'white',
							backgroundColor: '#1e8678',
							'&:hover': {
								backgroundColor: '#1877C3',
								boxShadow: '0px 0px 20px #000000;',
							}
						}}
						startIcon={<HomeIcon />}
					>
						Home
					</Button>

					<Button
						variant="outlined"
						onClick={() => { window.location.href = '/shows?page=0' }}
						sx={{
							margin: '10px',
							padding: '5px',
							width: '120px',
							height: '40px',
							borderRadius: '20px',
							color: 'white',
							backgroundColor: '#1e8678',
							'&:hover': {
								backgroundColor: '#1877C3',
								boxShadow: '0px 0px 20px #000000;',
							}
						}}
						startIcon={<MovieIcon />}
					>
						Shows
					</Button>
				</header>

				<div className='App-body'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/shows' element={<ShowList />} />
						<Route path='/shows/:id' element={<Show />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
};

export default App;
