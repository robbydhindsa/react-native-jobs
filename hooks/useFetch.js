import { useState, useEffect } from "react";
import axios from 'axios';
// import env from "react-native-dotenv";
import { RAPID_API_KEY, RAPID_API_HOST } from '@env';



const useFetch = (endpoint, query) => {
  // Define some states:
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;
  // const rapidApiHost = process.env.REACT_APP_RAPID_API_HOST;
  // console.log("rapid api key: ", rapidApiKey);
  console.log("rapid api key: ", RAPID_API_KEY);
  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      // IMPORT FROM .ENV FILE BEFORE PUSHING CHANGES TO GITHUB
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST
    },
    params: { ...query }
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert('There is an error');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // For issues of refetching data:
  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch };
  
}

export default useFetch;
