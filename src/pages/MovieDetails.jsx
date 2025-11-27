import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api.js';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';


const MovieDetails = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      setImageError(false);
      setImageLoading(true);

      try {
        const data = await getMovieDetails(imdbID);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (imdbID) {
      fetchMovieDetails();
    }
  }, [imdbID]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <ErrorMessage message={error} />
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              ← Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

 
  const placeholderImage = 'https://via.placeholder.com/400x600/1f2937/ffffff?text=No+Poster';
  const posterUrl = movie.Poster && movie.Poster !== 'N/A' && !imageError 
    ? movie.Poster 
    : placeholderImage;

  const handleImageError = (e) => {
    
    if (e.target.src !== placeholderImage) {
      setImageError(true);
      e.target.src = placeholderImage;
      setImageLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  
  const ratings = movie.Ratings || [];
  const imdbRating = movie.imdbRating !== 'N/A' ? movie.imdbRating : 'N/A';
  const metascore = movie.Metascore !== 'N/A' ? movie.Metascore : 'N/A';


  const actors = movie.Actors && movie.Actors !== 'N/A' ? movie.Actors.split(', ') : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-5 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-300 font-semibold shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <span>←</span> Back to Search
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          <div className="md:flex">
            {/* Movie Poster */}
            <div className="md:w-1/3 bg-gradient-to-br from-gray-100 to-gray-200 relative">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                  <div className="text-gray-400 text-6xl">🎬</div>
                </div>
              )}
              <img
                src={posterUrl}
                alt={movie.Title}
                className={`w-full h-auto object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
              />
            </div>

            {/* Movie Information */}
            <div className="md:w-2/3 p-6 md:p-10">
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                {movie.Title}
              </h1>

              <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Year:</span>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">{movie.Year}</span>
                </div>
                {movie.Rated && movie.Rated !== 'N/A' && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Rated:</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{movie.Rated}</span>
                  </div>
                )}
                {movie.Runtime && movie.Runtime !== 'N/A' && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Runtime:</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">{movie.Runtime}</span>
                  </div>
                )}
              </div>

              {movie.Genre && movie.Genre !== 'N/A' && (
                <div className="mb-6">
                  <span className="font-semibold text-gray-700">Genre: </span>
                  <span className="text-gray-600">{movie.Genre}</span>
                </div>
              )}

              {/* Ratings */}
              <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-5 rounded-xl border-2 border-primary-200">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">IMDB Rating</p>
                  <p className="text-3xl font-bold text-primary-600">{imdbRating}</p>
                </div>
                {metascore !== 'N/A' && (
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border-2 border-green-200">
                    <p className="text-sm text-gray-600 mb-2 font-semibold">Metascore</p>
                    <p className="text-3xl font-bold text-green-600">{metascore}</p>
                  </div>
                )}
                {ratings.length > 0 && ratings[0] && (
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl border-2 border-yellow-200">
                    <p className="text-sm text-gray-600 mb-2 font-semibold">{ratings[0].Source}</p>
                    <p className="text-3xl font-bold text-yellow-600">{ratings[0].Value}</p>
                  </div>
                )}
              </div>

              {/* Plot */}
              {movie.Plot && movie.Plot !== 'N/A' && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">Plot</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">{movie.Plot}</p>
                </div>
              )}

              {/* Director */}
              {movie.Director && movie.Director !== 'N/A' && (
                <div className="mb-4">
                  <span className="font-semibold text-gray-700">Director: </span>
                  <span className="text-gray-600">{movie.Director}</span>
                </div>
              )}

              {/* Writers */}
              {movie.Writer && movie.Writer !== 'N/A' && (
                <div className="mb-4">
                  <span className="font-semibold text-gray-700">Writer(s): </span>
                  <span className="text-gray-600">{movie.Writer}</span>
                </div>
              )}

              {/* Cast */}
              {actors.length > 0 && (
                <div className="mb-6">
                  <span className="font-semibold text-gray-700">Cast: </span>
                  <span className="text-gray-600">{actors.join(', ')}</span>
                </div>
              )}

              {/* Additional Information */}
              <div className="mt-8 pt-6 border-t-2 border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {movie.Language && movie.Language !== 'N/A' && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-700">Language: </span>
                      <span className="text-gray-600">{movie.Language}</span>
                    </div>
                  )}
                  {movie.Country && movie.Country !== 'N/A' && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-700">Country: </span>
                      <span className="text-gray-600">{movie.Country}</span>
                    </div>
                  )}
                  {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-700">Box Office: </span>
                      <span className="text-gray-600">{movie.BoxOffice}</span>
                    </div>
                  )}
                  {movie.Production && movie.Production !== 'N/A' && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-700">Production: </span>
                      <span className="text-gray-600">{movie.Production}</span>
                    </div>
                  )}
                  {movie.Awards && movie.Awards !== 'N/A' && (
                    <div className="md:col-span-2 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border-2 border-yellow-200">
                      <span className="font-semibold text-gray-700">🏆 Awards: </span>
                      <span className="text-gray-600">{movie.Awards}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
