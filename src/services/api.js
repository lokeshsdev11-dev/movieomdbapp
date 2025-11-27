/**
 * API Service for OMDB API
 * Handles all movie data fetching operations
 */

const API_KEY = '7b0be7'; // Replace with your OMDB API key - Get one from http://www.omdbapi.com/apikey.aspx
const BASE_URL = 'https://www.omdbapi.com/';

/**
 * Fetches movie search results from OMDB API
 * @param {string} searchTerm - The movie title or keyword to search for
 * @param {number} page - Page number for pagination (default: 1)
 * @param {string} type - Filter by type: movie, series, episode (optional)
 * @returns {Promise<Object>} Search results with movies array and total results
 */
export const searchMovies = async (searchTerm, page = 1, type = '') => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`;
    
    // Add type filter if provided (using API endpoint, not array.filter())
    if (type && type !== 'all') {
      url += `&type=${type}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'No results found');
    }

    return {
      movies: data.Search || [],
      totalResults: parseInt(data.totalResults) || 0,
      currentPage: page,
      totalPages: Math.ceil((parseInt(data.totalResults) || 0) / 10)
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch movies');
  }
};

/**
 * Fetches detailed information for a specific movie by IMDB ID
 * @param {string} imdbID - The IMDB ID of the movie
 * @returns {Promise<Object>} Detailed movie information
 */
export const getMovieDetails = async (imdbID) => {
  try {
    const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Movie not found');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch movie details');
  }
};

/**
 * Fetches movies by type filter (using API endpoint)
 * @param {string} type - Filter by type: movie, series, episode
 * @param {string} searchTerm - The search term (optional)
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<Object>} Filtered search results
 */
export const getMoviesByType = async (type, searchTerm = '', page = 1) => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}&type=${type}&page=${page}`;
    
    if (searchTerm) {
      url += `&s=${encodeURIComponent(searchTerm)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'No results found');
    }

    return {
      movies: data.Search || [],
      totalResults: parseInt(data.totalResults) || 0,
      currentPage: page,
      totalPages: Math.ceil((parseInt(data.totalResults) || 0) / 10)
    };
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch movies by type');
  }
};

