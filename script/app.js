import { updateDisplayState } from './index.js';

const populatedList = document.getElementById('populated-list');
const apiKey = `9cee424d`;
let searchInput = document.getElementById('search-movie');
let searchButton = document.getElementById('search-button');

updateDisplayState('initialState');

searchButton.addEventListener('click', (e) => {
	e.preventDefault();
	populatedList.textContent = '';
	let inputValue = searchInput.value;

	if (!inputValue) {
		updateDisplayState('noDataState');
		return;
	} else {
		updateDisplayState('populatedState');
		fetch(
			`https://www.omdbapi.com/?apikey=${apiKey}&s=${inputValue}&type=movie`
		)
			.then((response) => response.json())
			.then((data) => {
				let matchedMovies = data.Search;

				for (let matchedMovie of matchedMovies) {
					fetch(
						`https://www.omdbapi.com/?apikey=${apiKey}&i=${matchedMovie.imdbID}`
					)
						.then((response) => response.json())
						.then((movie) => {
							createMovieItem(movie);
							truncateTextTo145Characters();
						});
				}
				searchInput.value = '';
			});
	}
});

function truncateTextTo145Characters() {
	const movieSummary = document.querySelectorAll('.movie-details__summary');
	movieSummary.forEach((summary) => {
		if (summary.textContent.length > 145) {
			summary.textContent = summary.textContent.substring(0, 145) + '...';
		}
	});
}

function createMovieItem(movie, circleIconClass = 'fa-circle-plus') {
	const movieItem = document.createElement('li');
	movieItem.classList.add('movie-item');

	const movieImage = document.createElement('img');
	movieImage.classList.add('img');
	movieImage.setAttribute('src', movie.Poster);
	movieImage.setAttribute('alt', movie.Title);

	const movieDetails = document.createElement('div');
	movieDetails.classList.add('movie-details');

	const movieDetailsTitle = document.createElement('div');
	movieDetailsTitle.classList.add('movie-details__title');

	const movieTitle = document.createElement('h4');
	movieTitle.classList.add('movie-title');
	movieTitle.textContent = movie.Title;

	const movieScore = document.createElement('p');
	movieScore.classList.add('movie-score');

	const faStar = document.createElement('i');
	faStar.classList.add('fa-solid', 'fa-star');
	movieScore.textContent = movie.imdbRating;

	const movieDetailsAdd = document.createElement('div');
	movieDetailsAdd.classList.add('movie-details__additional');

	const movieDuration = document.createElement('span');
	movieDuration.classList.add('movie-duration');
	movieDuration.textContent = movie.Runtime;

	const movieGenre = document.createElement('span');
	movieGenre.classList.add('movie-genre');
	movieGenre.textContent = movie.Genre;

	const addToWatchlistBtn = document.createElement('button');
	addToWatchlistBtn.classList.add('btn', 'watchlist');
	addToWatchlistBtn.setAttribute('data-add', '');
	addToWatchlistBtn.setAttribute('title', 'Add to Watchlist');

	const circleIcon = document.createElement('i');
	circleIcon.classList.add('fa-solid', circleIconClass);
	addToWatchlistBtn.textContent = 'Watchlist';

	const movieDetailsSummary = document.createElement('p');
	movieDetailsSummary.classList.add('movie-details__summary');
	movieDetailsSummary.textContent = movie.Plot;

	movieScore.append(faStar);
	movieDetailsTitle.append(movieTitle, movieScore);
	addToWatchlistBtn.append(circleIcon);
	movieDetailsAdd.append(movieDuration, movieGenre, addToWatchlistBtn);
	movieDetails.append(movieDetailsTitle, movieDetailsAdd, movieDetailsSummary);
	movieItem.append(movieImage, movieDetails);
	populatedList.appendChild(movieItem);

	addToWatchlistBtn.addEventListener('click', () => addToWatchlist(movie));
}

function addToWatchlist(movie) {
	let storedWatchList = localStorage.getItem('movieWatchList');
	let movieWatchList = storedWatchList ? JSON.parse(storedWatchList) : [];

	const isMovieInWatchList = movieWatchList.some(
		(item) => item.imdbID === movie.imdbID
	);

	if (!isMovieInWatchList) {
		movieWatchList.push(movie);
	}

	localStorage.setItem('movieWatchList', JSON.stringify(movieWatchList));
}
