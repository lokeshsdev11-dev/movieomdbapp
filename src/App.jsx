import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import Navbar from './components/Navbar.jsx';

/**
 * Main App Component
 * Sets up React Router and defines application routes
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
