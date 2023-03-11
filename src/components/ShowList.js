import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchShows from './SearchShows';
import noImage from '../img/download.jpeg';
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography
} from '@mui/material';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

import '../App.css';

const ShowList = () => {
	const regex = /(<([^>]+)>)/gi;
	const [loading, setLoading] = useState(true);
	const [searchData, setSearchData] = useState(undefined);
	const [showsData, setShowsData] = useState(undefined);
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(0);
	const [currentAPIPage, setAPICurrentPage] = useState(0);
	const pageSize = 250;
	let navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const page = parseInt(searchParams.get('page')) || 0;
		setCurrentPage(page);
		setAPICurrentPage(Math.floor(page * pageSize / 250));
	}, [location.search]);

	useEffect(() => {
		async function fetchData() {
			let startingIndex = currentPage * pageSize;
			const url = searchTerm ? `http://api.tvmaze.com/search/shows?q=${searchTerm}&page=${currentAPIPage}` : `http://api.tvmaze.com/shows?page=${currentAPIPage}`;
			const { data } = await axios.get(url);
			
			// console.log(`currentPage: ${currentPage} | currentAPIPage: ${currentAPIPage}`)
			const startIndex = (currentAPIPage === 0) ? startingIndex : (startingIndex % 250);
			const endIndex = Math.min(startIndex + pageSize, data.length);

			if (searchTerm) {
				setSearchData(data.slice(startIndex, endIndex));
			} else {
				setShowsData(data.slice(startIndex, endIndex));
			}
			setLoading(false);
		}
		fetchData();
	}, [searchTerm, currentPage, currentAPIPage]);

	const handleNextPage = () => {
		const nextPage = currentPage + 1;
		const nextAPIPage = currentAPIPage + 1;
		setAPICurrentPage(nextAPIPage);
		setCurrentPage(nextPage);
		navigate(`/shows?page=${nextPage}`);
	};

	const handlePreviousPage = () => {
		const previousPage = currentPage - 1;
		const previousAPIPage = currentAPIPage === 0 ? 10 : currentAPIPage - 1;
		setAPICurrentPage(previousAPIPage);
		setCurrentPage(previousPage);
		navigate(`/shows?page=${previousPage}`);
	};

	const searchValue = async (value) => {
		setSearchTerm(value);
	};

	const buildCard = (show) => {
		return (
			<Grid item xs={12} sm={7} md={4} lg={3} xl={2} key={show.id}>
				<Card
					variant='outlined'
					sx={{
						padding: '1rem',
						maxWidth: 250,
						background: '#333333',
						height: 530,
						marginLeft: 'auto',
						marginRight: 'auto',
						marginBottom: '30px',
						borderRadius: 5,
						boxShadow: '0px 0px 30px #000000;',
						transition: 'transform 0.2s ease-in-out',
						'&:hover': {
							transform: 'scale(1.05)',
							boxShadow: '0px 0px 40px #e1e1e1;'
						},
					}}
				>
					<CardActionArea>
						<Link to={`/shows/${show.id}`}>
							<CardContent>
								<Typography
									sx={{
										fontWeight: 'bold',
										marginBottom: '10px'
									}}
									gutterBottom
									variant='h7'
									component='h3'
								>
									{show.name}
								</Typography>
								<CardMedia
									sx={{
										height: '380px',
										borderRadius: 4,
										boxShadow: '0px 0px 20px #000000;',
										objectFit: 'cover'
									}}
									component='img'
									image={
										show.image && show.image.original
											? show.image.original
											: noImage
									}
									title={show.name}
								/>
								<Typography
									marginTop='15px'
									variant='body2'
									color='#bbbbbb'
									component='p'
								>
									{show.summary
										? show.summary.replace(regex, '').substring(0, 100) + '...'
										: 'No Summary'}
								</Typography>
							</CardContent>
						</Link>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	let card = '';
	if (searchTerm) {
		card = searchData && searchData.map((shows) => {
			let { show } = shows;
			return buildCard(show);
		});
	} else {
		card = showsData && showsData.map((show) => {
			return buildCard(show);
		});
	}

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		return (
			<div>
				<SearchShows searchValue={searchValue} />
				<Grid
					spacing={2}
					sx={{
						flexGrow: 1,
						flexDirection: 'row'
					}}
				>
					<Button
						variant="outlined"
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
						startIcon={<SkipPreviousIcon />}
						disabled={currentPage === 0}
						onClick={handlePreviousPage}
					> Previous </Button>

					<Button
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
								boxShadow: '0px 0px 20px #000000;'
							}
						}}
						startIcon={<SkipNextIcon />}
						variant="outlined"
						disabled={searchTerm ? searchData.length < 20 : showsData.length < 20}
						onClick={handleNextPage}
					> Next </Button>
				</Grid>

				<br />
				<Grid
					container
					spacing={2}
					sx={{
						flexGrow: 1,
						flexDirection: 'row'
					}}
				>
					{card}
				</Grid>
			</div>
		);
	}
};

export default ShowList;
