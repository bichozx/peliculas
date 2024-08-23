import { useCallback, useState } from 'react';

import { ListMovies } from '../servicios/listMovies';

const FetchMovies = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);  // Estado para manejar la página actual

  const fetchData = useCallback(async (currentPage = 1) => {
    try {
      const response = await ListMovies(currentPage);
      console.log('list',response)
      setData(prevData => {
        // Combinamos las páginas de resultados anteriores con la nueva página
        return prevData ? {
          ...response,
          results: [...prevData.results, ...response.results]
        } : response;
      });
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    }
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  return { data, error, fetchData, loadMore };
};

export default FetchMovies;



