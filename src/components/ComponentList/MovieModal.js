import React, { useEffect, useState } from 'react';

import useMovieDetails from '../../helpers/useMovieDetails'; // 
import useMovieVideos from '../../helpers/useMovieVideos'; // 

const MovieModal = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieVideos, setMovieVideos] = useState(null);
  const [error, setError] = useState(null);
  const fetchMovieDetails = useMovieDetails();
  const fetchMovieVideos = useMovieVideos();

  useEffect(() => {
    fetchMovieDetails(
      movieId,
      (data) => setMovieDetails(data),
      (errorMsg) => setError(errorMsg)
    );
    fetchMovieVideos(
      movieId,
      (data) => setMovieVideos(data),
      (errorMsg) => setError(errorMsg)
    );
  }, [fetchMovieDetails, fetchMovieVideos, movieId]);

  if (error) return <div>Error: {error}</div>;
  if (!movieDetails || !movieVideos) return <div>Loading...</div>;
  

  return (
    // <div className="modal-overlay" onClick={onClose}>
    //   <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    //     <h2>{movieDetails.title}</h2>
    //     <img 
    //       src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} 
    //       alt={movieDetails.title} 
    //       className="movie-poster" 
    //     />
    //     {/* Aquí puedes usar movieVideos para mostrar los videos relacionados */}
    //     <button onClick={onClose} className="modal-close">Close</button>
    //   </div>
    // </div>
    <div className="modal-overlay" onClick={onClose}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <button onClick={onClose} className="modal-close">&times;</button>
    
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
        <p><strong>Género:</strong> {movieDetails.genres.map(genre => genre.name).join(', ')}</p>
        <p><strong>Duración:</strong> {movieDetails.runtime} minutos</p>
        <p><strong>Puntuación:</strong> {movieDetails.vote_average}/10</p>
      </div>
    </div>
    
    <div className="modal-trailers">
      <h3>Trailers</h3>
      <div className="trailer-list">
        {movieVideos.length > 0 ? (
          movieVideos.map(video => (
            <div key={video.id} className="trailer">
              <h4>{video.name}</h4>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p>No hay trailers disponibles para esta película.</p>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default MovieModal;
