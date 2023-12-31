import { updateDisplayState } from './index.js';

const populatedList = document.getElementById('populated-list');
let movieWatchList = [];

window.addEventListener('DOMContentLoaded', loadWatchlist);

function loadWatchlist() {
	populatedList.textContent = '';

	let storedWatchList = localStorage.getItem('movieWatchList');
	movieWatchList = storedWatchList ? JSON.parse(storedWatchList) : [];

	if (movieWatchList.length === 0) {
		updateDisplayState('initialState');
	} else {
		updateDisplayState('populatedState');
		movieWatchList.map((item) => createMovieItem(item));
	}
}

function createMovieItem(movie) {
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

	const removeFromWatchListBtn = document.createElement('button');
	removeFromWatchListBtn.classList.add('btn', 'watchlist');
	removeFromWatchListBtn.setAttribute('data-remove', '');
	removeFromWatchListBtn.setAttribute('type', 'button');
	removeFromWatchListBtn.setAttribute('title', 'Delete from Watchlist');

	const circleIcon = document.createElement('i');
	circleIcon.classList.add('fa-solid', 'fa-circle-minus');
	removeFromWatchListBtn.textContent = 'Watchlist';

	const movieDetailsSummary = document.createElement('p');
	movieDetailsSummary.classList.add('movie-details__summary');
	movieDetailsSummary.textContent = movie.Plot;

	movieScore.append(faStar);
	movieDetailsTitle.append(movieTitle, movieScore);
	removeFromWatchListBtn.append(circleIcon);
	movieDetailsAdd.append(movieDuration, movieGenre, removeFromWatchListBtn);
	movieDetails.append(movieDetailsTitle, movieDetailsAdd, movieDetailsSummary);
	movieItem.append(movieImage, movieDetails);
	populatedList.appendChild(movieItem);

	removeFromWatchListBtn.addEventListener('click', () =>
		removeFromWatchlist(movie)
	);
}

function removeFromWatchlist(movie) {
	movieWatchList.forEach((item, i) => {
		if (item.imdbID === movie.imdbID) {
			movieWatchList.splice(i, 1);
		}
	});

	localStorage.setItem('movieWatchList', JSON.stringify(movieWatchList));
	loadWatchlist();
}
