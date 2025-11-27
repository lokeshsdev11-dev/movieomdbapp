import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const MovieCard = ({ movie }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  
  const placeholderImage = 'https://via.placeholder.com/300x450/1f2937/ffffff?text=No+Poster';
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

  return (
    <Link to={`/movie/${movie.imdbID}`} className="block group">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-2">
        <div className="relative w-full h-96 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
              <div className="text-gray-400 text-4xl">🎬</div>
            </div>
          )}
          <img
            src={posterUrl}
            alt={movie.Title}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
              {movie.Type ? movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1) : 'Movie'}
            </span>
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {movie.Title}
          </h3>
          <div className="mt-auto space-y-1">
            <p className="text-gray-600 text-sm">
              <span className="font-semibold text-gray-700">Year:</span> {movie.Year}
            </p>
            {movie.Type && (
              <p className="text-gray-500 text-xs">
                {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
