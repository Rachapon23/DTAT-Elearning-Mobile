import { useState, useEffect } from 'react';
import axios from 'axios';
import { REACT_APP_API } from '@env';

const useFetch = (endpoint, query = [], authtoken = null) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `${REACT_APP_API}/${endpoint}`,
        headers: {
            authtoken,
        },
        params: { ...query },
    };

    const fetchData = async () => {
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
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}

export default useFetch;