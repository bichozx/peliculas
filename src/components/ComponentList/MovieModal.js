import React, { useEffect, useState } from 'react';

import useMovieDetails from '../../hooks/useMovieDetails';
import useMovieVideos from '../../hooks/useMovieVideos';

const MovieModal = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVideos, setMovieVideos] = useState(null);
  const [error, setError] = useState(null);
  const fetchMovieDetails = useMovieDetails();
  const fetchMovieVideos = useMovieVideos();
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  useEffect(() => {
    fetchMovieDetails(
      movieId,
      (data) => setMovieDetails(data),
      (errorMsg) => setError(errorMsg)
    );
    fetchMovieVideos(
      movieId,
      (data) => setMovieVideos(data.results),
      (errorMsg) => setError(errorMsg)
    );
  }, [fetchMovieDetails, fetchMovieVideos, movieId]);

  if (error) return <div>Error: {error}</div>;
  if (!movieDetails || !movieVideos) return <div>Loading...</div>;
  console.log(movieVideos);

  const handleNext = () => {
    if (currentTrailerIndex < movieVideos.length - 1) {
      setCurrentTrailerIndex(currentTrailerIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentTrailerIndex > 0) {
      setCurrentTrailerIndex(currentTrailerIndex - 1);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close">
          &times;
        </button>

        <div className="modal-header">
          <h2>{movieDetails.title}</h2>
        </div>

        <div className="modal-body">
          <div className="movie-poster-container">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className="movie-modal"
            />
          </div>

          <div className="movie-details">
            <p>
              <strong>Género:</strong>{' '}
              {movieDetails.genres.map((genre) => genre.name).join(', ')}
            </p>
            <p>
              <strong>Duración:</strong> {movieDetails.runtime} minutos
            </p>
            <p>
              <strong>Puntuación:</strong> {movieDetails.vote_average}/10
            </p>

            {/* Trailers section */}
            <div className="modal-trailers">
              <h3>Trailers ({movieVideos.length})</h3>
              {movieVideos.length > 0 ? (
                <div>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${movieVideos[currentTrailerIndex].key}`}
                    title={movieVideos[currentTrailerIndex].name}
                    style={{ border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="trailer-controls">
                    <button
                      onClick={handlePrevious}
                      disabled={currentTrailerIndex === 0}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentTrailerIndex === movieVideos.length - 1}
                    >
                      Next
                    </button>
                  </div>
                </div>
              ) : (
                <p>No trailers available for this movie.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
