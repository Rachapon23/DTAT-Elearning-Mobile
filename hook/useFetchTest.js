import { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_API } from "@env";
const AUTHTOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6IlJhY2hhcG9uIiwicm9sZSI6ImFkbWluIiwidXNlcl9pZCI6IjY1MGQ3NDFhMDA1Njk3MWI0ZjAyN2FmOSJ9LCJpYXQiOjE2OTY3NTc5MDAsImV4cCI6MTY5Njg0NDMwMH0.ajdAi4rAIotFIdv--jANeWBHxx6ZmLF6wk0yQ2yrSFE";

const useFetch = (method, endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = `${REACT_APP_API}/${endpoint}`;
    redirecFunc(method, url);
  }, []);

  const redirecFunc = async (method, url) => {
    console.log("method :", method);
    console.log("url :", url);
    if (method == "GET") {
      await fetchDataGET(url)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          setError(err);
        });
    } else if (method == "POST") {
      await fetchDataPOST(url)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          setError(err);
        });
    }
  };
    return {data,error};
};

// GET:
const fetchDataGET = async (url) => {
  return await axios.get(url, {
    headers: {
      AUTHTOKEN,
    },
  });
};
// POST:
const fetchDataPOST = async (url) => {
  return await axios.post(url, {
    headers: {
      AUTHTOKEN,
    },
  });
};

export default useFetch;
