import { useState, useEffect } from "react";
import axios from "axios";
import { REACT_APP_API } from "@env";

import * as SecureStore from "expo-secure-store";

const useFetch = (
	options = {
		method: "GET",
		endpoint: null,
		query: [],
		payload: null,
		blob: null,
	}
) => {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const [error, setError] = useState(null);

	const fetchData = async ({
		method = "GET",
		endpoint = null,
		query = [],
		payload = null,
		blob,
	}) => {
		const authtoken = await SecureStore.getItemAsync("token");
		// console.log("authtoken:", authtoken)
		// console.log("blob", blob)
		let options = {
			method,
			url: `${REACT_APP_API}/${endpoint}`,
			headers: {
				authtoken,
			},
			params: { ...query },
			data: payload,
		};

		if (blob) options["responseType"] = "blob";

		try {
			setIsLoading(true);
			const res = await axios.request(options);
			setData(res.data.data);
			setIsLoading(false);
			return res.data;
		} catch (err) {
			setError(err);
			setIsLoading(false);
			// alert('Error on fetch data');
			return err?.response?.data;
		}
	};

	const checkOptions = (options) => {
		if (!options) return false;
		if (!options?.endpoint) return false;
		return true;
	};

	useEffect(() => {
		const fetch = checkOptions(options);
		if (fetch) {
			fetchData({ ...options });
		}
	}, []);

	const refetch = () => {
		setIsLoading(true);
		if (!options.endpoint) {
			console.error("refetch in useFetch must take argument before called");
			return;
		}
		fetchData({ ...options });
	};

	return { data, isLoading, error, refetch, fetchData };
};
export default useFetch;
