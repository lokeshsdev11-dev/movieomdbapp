

const API_KEY = '7b0be7'; 
const BASE_URL = 'https://www.omdbapi.com/';


export const searchMovies = async (searchTerm, page = 1, type = '') => {
  try {
    let url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`;
    
    
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

