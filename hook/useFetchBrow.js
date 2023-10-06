import { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_API } from "@env";
const AUTHTOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6IlJhY2hhcG9uIiwicm9sZSI6ImFkbWluIiwidXNlcl9pZCI6IjY1MGQ3NDFhMDA1Njk3MWI0ZjAyN2FmOSJ9LCJpYXQiOjE2OTY2MDc5MDAsImV4cCI6MTY5NjY5NDMwMH0.59pZRJFQ4IKActUrbuy9oQ9IHcgS7En3nko8xUhtFno";

const useFetch = (query = [], authtoken = AUTHTOKEN) => {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `${REACT_APP_API}/list-course?selects=name,detail,image,type`,
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
      setData1(res.data.data);
      setData2(res.data.data);
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

  return { data1, setData1, data2, setData2, isLoading, error, refetch };
};

export default useFetch;
