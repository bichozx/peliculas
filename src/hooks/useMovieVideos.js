import { MovieRequest } from '../servicios/movieRequests';
import { useCallback } from 'react';

const useMovieVideos = () => {
  const fetchMovieVideos = useCallback(async (movieId, onVideosLoaded, onError) => {
    try {
      const response = await MovieRequest(movieId);
      onVideosLoaded(response);  // Llama al callback cuando los videos están cargados
    } catch (err) {
      onError(err.message);  // Llama al callback si hay un error
    }
  }, []);

  return fetchMovieVideos;  // Devuelve la función que se puede usar en cualquier parte
};

export default useMovieVideos;
