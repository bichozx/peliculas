import { useCallback, useState } from 'react';

import { ListMovies } from '../servicios/listMovies';

const FetchMovies = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await ListMovies();
      setData(response);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    }
  }, []);

  return { data, error, fetchData };
};

export default FetchMovies;


