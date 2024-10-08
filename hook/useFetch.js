import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKeys = [
    process.env.REACT_APP_API_KEY_2,
    process.env.REACT_APP_API_KEY_3,
    process.env.REACT_APP_API_KEY_4,
    process.env.REACT_APP_API_KEY_1,
    process.env.REACT_APP_API_KEY_5,
    //  more keys
  ];

  const fetchData = async () => {
    setIsLoading(true);

    for (let key of apiKeys) {
      const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
          "X-RapidAPI-Key": key,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
        params: { ...query },
      };

      try {
        const response = await axios.request(options);

        if (response.status === 200) {
          setData(response.data.data);
          setIsLoading(false);
          setError(null);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }

    // If the loop completes without returning, all keys have failed
    setError("All API keys are expired or invalid");
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
