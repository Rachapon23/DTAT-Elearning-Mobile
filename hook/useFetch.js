import { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_API } from "@env";
const AUTHTOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0bmFtZSI6IlJhY2hhcG9uIiwicm9sZSI6ImFkbWluIiwidXNlcl9pZCI6IjY1MGQ3NDFhMDA1Njk3MWI0ZjAyN2FmOSJ9LCJpYXQiOjE2OTY2MDc5MDAsImV4cCI6MTY5NjY5NDMwMH0.59pZRJFQ4IKActUrbuy9oQ9IHcgS7En3nko8xUhtFno";

const useFetch = (method = 'GET', endpoint, query = [], authtoken = AUTHTOKEN) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async (method, endpoint, query = [], authtoken = AUTHTOKEN) => {
        const options = {
            method: method,
            url: `${REACT_APP_API}/${endpoint}`,
            headers: {
                authtoken,
            },
            params: { ...query },
        };
        setIsLoading(true);
        try {
            const res = await axios.request(options)
            setData(res.data.data)
        }
        catch (err) {
            setError(err);
            alert('Error on fetch data');
        }
        finally {
            setIsLoading(false)
            return res.data
        }
    }

    useEffect(() => {
        fetchData(method, endpoint, query, authtoken);
    }, [])

    const refetch = () => {
        setIsLoading(true);
        if (!endpoint) {
            console.error("refetch in useFetch must take argument before called")
            return
        }
        fetchData(method, endpoint, query, authtoken);
    }

    return { data, isLoading, error, refetch, fetchData };
}
export default useFetch;

