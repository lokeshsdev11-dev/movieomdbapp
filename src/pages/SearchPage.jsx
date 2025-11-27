import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import TypeFilter from '../components/TypeFilter.jsx';
import MovieList from '../components/MovieList.jsx';
import Pagination from '../components/Pagination.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { searchMovies, getMoviesByType } from '../services/api.js';

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

 
  useEffect(() => {
    if (location.pathname === '/') {
     
      setMovies([]);
      setSearchTerm('');
      setError(null);
      setCurrentPage(1);
      setTotalPages(0);
      setTotalResults(0);
    }
  }, [location.pathname]);

  /**
   * Handles movie search
   * @param {string} term - Search term
   */
  const handleSearch = async (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    await fetchMovies(term, selectedType, 1);
  };

  /**
   * Handles type filter change
   * Uses API endpoint for filtering, not array.filter()
   * @param {string} type - Selected type filter
   */
  const handleTypeChange = async (type) => {
    setSelectedType(type);
    setCurrentPage(1);
    if (searchTerm) {
      await fetchMovies(searchTerm, type, 1);
    }
  };

  /**
   * Handles page change for pagination
   * @param {number} page - Page number
   */
  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await fetchMovies(searchTerm, selectedType, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Fetches movies from API
   * Uses API endpoint for type filtering, not array.filter()
   * @param {string} term - Search term
   * @param {string} type - Type filter
   * @param {number} page - Page number
   */
  const fetchMovies = async (term, type, page) => {
    if (!term.trim()) {
      setMovies([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let result;
      
      // Use API endpoint for filtering, not array.filter()
      if (type && type !== 'all') {
        result = await getMoviesByType(type, term, page);
      } else {
        result = await searchMovies(term, page, type);
      }

      setMovies(result.movies);
      setTotalPages(result.totalPages);
      setTotalResults(result.totalResults);
    } catch (err) {
      setError(err.message);
      setMovies([]);
      setTotalPages(0);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
            Discover Movies
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Search for your favorite movies, TV series, and episodes from around the world
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-8 max-w-4xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Filter Section */}
        <div className="mb-8 max-w-4xl mx-auto">
          <TypeFilter selectedType={selectedType} onTypeChange={handleTypeChange} />
        </div>

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Error State */}
        {error && <ErrorMessage message={error} />}

        {/* Results Section */}
        {!loading && !error && movies.length > 0 && (
          <div className="animate-fade-in">
            <div className="mb-6 text-center">
              <p className="text-lg text-gray-700 font-semibold">
                Found <span className="text-primary-600 font-bold">{totalResults}</span> result{totalResults !== 1 ? 's' : ''}
              </p>
            </div>
            <MovieList movies={movies} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* No Results State */}
        {!loading && !error && movies.length === 0 && searchTerm && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-700 font-semibold mb-2">
              No movies found
            </p>
            <p className="text-gray-600">
              Try a different search term or filter
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && movies.length === 0 && !searchTerm && (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-7xl mb-6">🎬</div>
            <p className="text-2xl text-gray-700 font-semibold mb-3">
              Start Your Movie Journey
            </p>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Enter a movie title or keyword above to discover amazing films and TV shows
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
