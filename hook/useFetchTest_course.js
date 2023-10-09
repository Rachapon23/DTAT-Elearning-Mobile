import { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_API } from "@env";
const AUTHTOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6IlJhY2hhcG9uIiwicm9sZSI6ImFkbWluIiwidXNlcl9pZCI6IjY1MGQ3NDFhMDA1Njk3MWI0ZjAyN2FmOSJ9LCJpYXQiOjE2OTY3NTc5MDAsImV4cCI6MTY5Njg0NDMwMH0.ajdAi4rAIotFIdv--jANeWBHxx6ZmLF6wk0yQ2yrSFE";

const useFetch = (method, endpoint) => {
  const [course, setCourse] = useState(null);
  const [profile, setProfile] = useState(null);
  const [topic, setTopic] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let url_course = `${REACT_APP_API}/${endpoint}`;
    redirecFunc(url_course);
  }, []);

  const redirecFunc = async (url_course) => {
    await fetchDataCourse(url_course)
      .then((res) => {
        let data = res?.data?.data;
        setCourse(data);
        let url_profile = `${REACT_APP_API}/get-profile/user/${data?.teacher}`;
        let url_topic = `${REACT_APP_API}/list-topic/course/${data?._id}`;

        fetchDataProfile(url_profile)
          .then((res) => {
            setProfile(res?.data?.data);
          })
          .catch((err) => {
            setError(err);
          });
        fetchDataTopic(url_topic)
          .then((res) => {
            setTopic(res?.data);
          })
          .catch((err) => {
            setError(err);
          });
      })
      .catch((err) => {
        setError(err);
      });
  };
  return { course, profile, topic, error };
};

const fetchDataCourse = async (url_course) => {
  return await axios.get(url_course, {
    headers: {
      AUTHTOKEN,
    },
  });
};

const fetchDataProfile = async (url_profile) => {
  return await axios.get(url_profile, {
    headers: {
      AUTHTOKEN,
    },
  });
};

const fetchDataTopic = async (url_topic) => {
  return await axios.get(url_topic, {
    headers: {
      AUTHTOKEN,
    },
  });
};

export default useFetch;
