import { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_API } from "@env";
const AUTHTOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6IlJhY2hhcG9uIiwicm9sZSI6ImFkbWluIiwidXNlcl9pZCI6IjY1MGQ3NDFhMDA1Njk3MWI0ZjAyN2FmOSJ9LCJpYXQiOjE2OTY3NTc5MDAsImV4cCI6MTY5Njg0NDMwMH0.ajdAi4rAIotFIdv--jANeWBHxx6ZmLF6wk0yQ2yrSFE";

const useFetch = (endpoint,type) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url = `${REACT_APP_API}/${endpoint}`;
    redirecFunc(url);
  }, []);

  const redirecFunc = async (url) => {
    await fetchImagePrivate(url)
      .then((res) => {
        let data = res?.data;
        // var imageBase64 = 'data:'+type+';base64,'+data
        setImage(data);
      })
      .catch((err) => {
        setError(err);
      });
  };
  return { image, error };
};

const fetchImagePrivate = async (url) => {
  return await axios.get(url, {
    headers: {
      AUTHTOKEN,
    },
  });
};


export default useFetch;
