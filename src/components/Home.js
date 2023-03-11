import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid, Fade } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '60vh',
		backgroundImage: 'url(https://source.unsplash.com/evlkOfkQ5rE/1600x900)',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	title: {
		fontWeight: 'bold',
		color: theme.palette.common.white,
		marginBottom: theme.spacing(2),
	},
	subtitle: {
		color: theme.palette.common.white,
		marginBottom: theme.spacing(4),
	},
	button: {
		color: theme.palette.common.white,
		borderColor: theme.palette.common.white,
		marginTop: theme.spacing(2),
		'&:hover': {
			color: theme.palette.primary.main,
			backgroundColor: theme.palette.common.white,
		},
	},
}));

const Home = () => {
	const classes = useStyles();
	const [fade, setFade] = React.useState(false);

	React.useEffect(() => {
		setFade(true);
	}, []);

	return (
		<div className={classes.root}>
			<Fade in={fade} timeout={1000}>
				<Grid container direction="column" alignItems="center">
					<Grid item>
						<Typography variant="h2" align="center" className={classes.title}>
							Welcome to MovieList
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="h6" align="center" className={classes.subtitle}>
							Browse and discover your favorite movies and TV shows
						</Typography>
					</Grid>
					<Grid item>
						<Button
							variant="outlined"
							component={Link}
							to="/shows"
							className={classes.button}
						>
							Get Started
						</Button>
					</Grid>
				</Grid>
			</Fade>
		</div>
	);
};

export default Home;