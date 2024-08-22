import { MovieDetails } from '../servicios/movieDetails';
import { useCallback } from 'react';

const useMovieDetails = () => {
  const fetchMovieDetails = useCallback(async (movieId, onDataLoaded, onError) => {
    try {
      const response = await MovieDetails(movieId);
      onDataLoaded(response);  // Llama al callback cuando los datos están cargados
    } catch (err) {
      onError(err.message);  // Llama al callback si hay un error
    }
  }, []);

  return fetchMovieDetails;  // Devuelve la función que se puede usar en cualquier parte
};

export default useMovieDetails;