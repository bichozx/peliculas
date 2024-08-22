// import React, { useEffect, useState } from 'react';

// import FetchMovies from '../../helpers/FetchMovies';

// export const List = () => {
//   const { data, error, fetchData } = FetchMovies();
//   const [listState, setListState] = useState ([]);
//   const [arrayList, setArrayList]= useState ([])
  

//   useEffect(() => {
//     getPeliculas();
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     if (data && data.results) {
//       setArrayList(data.results);
//     }
//   }, [data]);

//   const getPeliculas = () => {
//     let movies = JSON.parse(localStorage.getItem('pelis'));
//     setListState(movies)
//   };

 

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   console.log(data);

//   return (
//     <>
//     {
//       arrayList.map(movies => {
        
//         return(
//           <article key={movies.id}className="peli-item">
//           <img src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt={movies.title} className="movie-poster" />
//         <h3 className="title">{movies.title}</h3>
//         <p className="description">{''}</p>

//         <button className="edit">Editar</button>
//         <button className="delete">Borrar</button>
//       </article>
//         )

//       })
//     }
      
//     </>
//   );
// };

// import React, { useEffect, useState } from 'react';

// import FetchMovies from '../../helpers/FetchMovies';
// import MovieModal from './MovieModal'; // Asegúrate de que la ruta al componente sea correcta

// export const List = () => {
//     const { data, error, fetchData } = FetchMovies();
//     const [arrayList, setArrayList] = useState([]);
//     const [selectedMovieId, setSelectedMovieId] = useState(null); // Estado para el ID de la película seleccionada
//     const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     useEffect(() => {
//         if (data && data.results) {
//             setArrayList(data.results);
//         }
//     }, [data]);

//     const openModal = (movieId) => {
//         setSelectedMovieId(movieId);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedMovieId(null);
//     };

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!data) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <>
//             {arrayList.map(movies => (
//                 <article key={movies.id} className="peli-item">
//                     <img
//                         src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
//                         alt={movies.title}
//                         className="movie-poster"
//                         onClick={() => openModal(movies.id)} // Abre el modal al hacer clic en la imagen
//                     />
//                     <h3 className="title" onClick={() => openModal(movies.id)}> 
//                         {movies.title}
//                     </h3>
//                     <p className="description">{''}</p>
//                 </article>
//             ))}

//             {isModalOpen && (
//                 <MovieModal movieId={selectedMovieId} onClose={closeModal} />
//             )}
//         </>
//     );
//};

import React, { useEffect, useState } from 'react';

import FetchMovies from '../../helpers/FetchMovies';
import MovieModal from './MovieModal';

export const List = () => {
  const { data, error, fetchData } = FetchMovies();
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
      {arrayList.map(movie => (
        <article key={movie.id} className="peli-item">
          <img 
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
            alt={movie.title} 
            className="movie-poster" 
            onClick={() => handleOpenModal(movie.id)}
          />
          <h3 
            className="title" 
            onClick={() => handleOpenModal(movie.id)}
          >
            {movie.title}
          </h3>
          <p className="description">{''}</p>
          <button className="edit">Editar</button>
          <button className="delete">Borrar</button>
        </article>
      ))}
      {selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
    </>
  );
};


