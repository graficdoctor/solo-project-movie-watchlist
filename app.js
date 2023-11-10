const initialState = document.querySelector('.initial-state');
const populatedState = document.querySelector('.populated-state');
const noDataState = document.querySelector('.no-data-state');
const movieSummary = document.querySelectorAll('.movie-details__summary');
const populatedList = document.getElementById('populated-list');

movieSummary.forEach((summary) => {
	if (summary.textContent.length > 150) {
		summary.textContent = summary.textContent.substring(0, 150) + '...';
	}
});

let searchUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=9cee424d';

// const OMDBApi = '';

fetch(searchUrl)
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
		let movieItem = document.createElement('li');
		movieItem.classList.add('movie-item');
		movieItem.innerHTML = `
		  <img
			  src="${data.Poster}"
				alt="${data.Title}"
				class="img"
			/>
			<div class="movie-details">
			  <div class="movie-details__title">
				  <h4 class="movie-title">${data.Title}</h4>
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
						${data.imdbRating}
					</p>
        </div>
				<div class="movie-details__additional">
					<span class="movie-duration">${data.Runtime}</span>
					<span class="movie-genre">${data.Genre}</span>
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
				<p class="movie-details__summary">${data.Plot}</p>
      </div>						
    `;
		populatedList.append(movieItem);
		return populatedList;
	});
