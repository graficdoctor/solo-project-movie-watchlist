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
	} else {
		updateDisplayState('populatedState');
		fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${inputValue}&type=movie`)
			.then((response) => response.json())
			.then((data) => {
				let matchedMovies = data.Search;

				matchedMovies.forEach((matchedMovie) => {
					fetch(
						`http://www.omdbapi.com/?apikey=${apiKey}&i=${matchedMovie.imdbID}`
					)
						.then((response) => response.json())
						.then((movie) => {
							let movieItem = document.createElement('li');
							movieItem.classList.add('movie-item');
							movieItem.innerHTML = createMovieItemInnerHTML(movie);
							populatedList.append(movieItem);
							truncateTextTo145Characters();
						});
				});
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

function createMovieItemInnerHTML(movie) {
	let movieItemInnerHTML = `
            <img
            src="${movie.Poster}"
            alt="${movie.Title}"
            class="img"
            />
            <div class="movie-details">
            <div class="movie-details__title">
            <h4 class="movie-title">${movie.Title}</h4>
            <p class="movie-score">
            <span>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-star"
            width="44"
            height="44"
            viewBox="0 0 24 24"
            stroke-width="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path
                      d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                      />
                      </svg>
                      </span>
                      ${movie.imdbRating}
                      </p>
                      </div>
                      <div class="movie-details__additional">
                      <span class="movie-duration">${movie.Runtime}</span>
                      <span class="movie-genre">${movie.Genre}</span>
                      <button class="btn add-to-watchlist">
                      <span>
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-circle-plus"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                    <path d="M9 12h6" />
                    <path d="M12 9v6" />
                    </svg>
                    </span>
                    Watchlist
                    </button>
                    </div>
                    <p class="movie-details__summary">${movie.Plot}</p>
                    </div>						
                    `;
	return movieItemInnerHTML;
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
