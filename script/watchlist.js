import { updateDisplayState, createMovieItem } from './app.js';

updateDisplayState('initialState');

createMovieItem(movie, (circleIconClass = 'fa-circle-minus'));
