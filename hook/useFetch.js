import { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_API } from "@env";
const AUTHTOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6IlJhY2hhcG9uIiwicm9sZSI6ImFkbWluIiwidXNlcl9pZCI6IjY1MGQ3NDFhMDA1Njk3MWI0ZjAyN2FmOSJ9LCJpYXQiOjE2OTYxNzMzOTksImV4cCI6MTY5NjI1OTc5OX0.9Bpt7FozLKCyGtUOrxIpHoi1iF21Z8ZwKf30-pf67WQ";

const useFetch = (endpoint, query = [], authtoken = AUTHTOKEN) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `${REACT_APP_API}/${endpoint}`,
    headers: {
      authtoken,
    },
    params: { ...query },
  };

  const fetchData = async () => {
    console.log(options.url);
    setIsLoading(true);
    try {
      const res = await axios.request(options);
      setData(res.data.data);
    } catch (err) {
      setError(err);
      alert("Error on fetch data");
    } finally {
      setIsLoading(false);
    }
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
