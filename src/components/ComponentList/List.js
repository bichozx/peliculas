// import React, { useEffect, useState } from 'react';

// import FetchMovies from '../../hooks/FetchMovies';
// import MovieModal from './MovieModal';

// export const List = () => {
//   const { data, error, fetchData, loadMore } = FetchMovies();
//   console.log(data)
//   const [arrayList, setArrayList] = useState([]);
//   const [selectedMovieId, setSelectedMovieId] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     if (data && data.results) {
//       setArrayList(data.results);
//       localStorage.setItem('pelis', JSON.stringify(data.results));
//     }
//   }, [data]);

//   const handleOpenModal = (movieId) => {
//     setSelectedMovieId(movieId);
//   };

//   const handleCloseModal = () => {
//     setSelectedMovieId(null);
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       {arrayList.map(movie => (
//         <article key={movie.id} className="peli-item">
//           <img
//             src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
//             alt={movie.title}
//             className="movie-poster"
//             onClick={() => handleOpenModal(movie.id)}
//           />
//           <h3
//             className="title"
//             onClick={() => handleOpenModal(movie.id)}
//           >
//             {movie.title}
//           </h3>
//           <p className="description">{''}</p>

//         </article>
//       ))}
//       {selectedMovieId && (
//         <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
//       )}

//        {/* Botón para cargar más películas */}
//        <button onClick={loadMore} className="load_more">
//         Mostrar más
//       </button>
//     </>
//   );
// };

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import React, { useEffect, useState } from 'react';

import FetchMovies from '../../hooks/FetchMovies';
import MovieModal from './MovieModal';

export const List = () => {
  const { data, error, fetchData, loadMore } = FetchMovies();
  const [arrayList, setArrayList] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (data && data.results) {
      setArrayList(data.results);
      localStorage.setItem('pelis', JSON.stringify(data.results));
    }
  }, [data]);

  const handleOpenModal = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="movie-list">
        {arrayList.map((movie) => {
          const votePercentage = (movie.vote_average / 10) * 100; // Convierte el vote_average a porcentaje
          return (
            <article key={movie.id} className="peli-item">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
                onClick={() => handleOpenModal(movie.id)}
              />
              <div className="movie-info">
                <h3 className="title" onClick={() => handleOpenModal(movie.id)}>
                  {movie.title}
                </h3>
                <div className="rating-container">
                  <span className="rating-label">Puntuación de usuarios</span>
                  <div className="rating-circle">
                    <CircularProgressbar
                      value={votePercentage}
                      text={`${votePercentage.toFixed(0)}%`}
                      styles={buildStyles({
                        textSize: '20px', // Tamaño del texto del porcentaje
                        pathColor: '#f39c12', // Color de la barra de progreso
                        textColor: '#333', // Color del texto
                        trailColor: '#eee', // Color del fondo de la barra
                        // Ajustes adicionales opcionales
                        textAlign: 'center', // Centrado del texto
                        verticalAlign: 'middle', // Centrado vertical (asegura la alineación vertical)
                      })}
                    />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}

      {/* Botón para cargar más películas */}
      <button onClick={loadMore} className="load_more">
        Mostrar más
      </button>
    </>
  );
};
