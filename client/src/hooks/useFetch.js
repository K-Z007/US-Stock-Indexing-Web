import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const mounted = useRef(true);

    // fetch the data from server when first render the page;
    useEffect(() => {
        //const controller = new AbortController(); // The AbortController interface represents a controller object that allows you to abort one or more Web requests as and when desired.

        axios
            .get(url) //", { singal: controller.signal }" AbortController.signal (Read only) Returns an AbortSignal object instance, which can be used to communicate with, or to abort, a DOM request.
            .then((res) => {
                // console.log(res);
                if (res.statusText !== "OK") {
                    throw Error("Could not fetch the data");
                }
                // console.log(data[3]);
                mounted.current && setData(res.data);
                // setData(res.data);
                setIsLoading(false);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });

        return () => {
            // console.log("Cancel this fetch");
            // controller.abort();
            mounted.current = false;
        };
    }, []);

    return { data, isLoading, error };
};

export default useFetch;
