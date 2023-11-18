export { updateDisplayState, createMovieItem };

const initialState = document.querySelector('.initial-state');
const populatedState = document.querySelector('.populated-state');
const noDataState = document.querySelector('.no-data-state');
const populatedList = document.getElementById('populated-list');
const apiKey = `9cee424d`;
let searchInput = document.getElementById('search-movie');
let searchButton = document.getElementById('search-button');

updateDisplayState('initialState');

searchButton.addEventListener('click', (e) => {
	e.preventDefault();
	let inputValue = searchInput.value;

	if (!inputValue) {
		updateDisplayState('noDataState');
		return;
	} else {
		updateDisplayState('populatedState');
		fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${inputValue}&type=movie`)
			.then((response) => response.json())
			.then((data) => {
				let matchedMovies = data.Search;

				for (let matchedMovie of matchedMovies) {
					fetch(
						`http://www.omdbapi.com/?apikey=${apiKey}&i=${matchedMovie.imdbID}`
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
	addToWatchlistBtn.classList.add('btn', 'add-to-watchlist');

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
}

function updateDisplayState(displayState) {
	// Hide all states initially
	initialState.style.display = 'none';
	noDataState.style.display = 'none';
	populatedState.style.display = 'none';

	// Show the desired state
	switch (displayState) {
		case 'initialState':
			initialState.style.display = 'flex';
			break;
		case 'noDataState':
			noDataState.style.display = 'flex';
			break;
		case 'populatedState':
			populatedState.style.display = 'block';
			break;
		default:
			console.error('Invalid display state:', displayState);
	}
}

// function loadMoviesWatchList() {
// 	updateDisplayState('initialState');
// }
