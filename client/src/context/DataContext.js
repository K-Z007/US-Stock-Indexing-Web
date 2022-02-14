import React, { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const DataContext = createContext();

const DataContextProvider = (props) => {
    const [companyNames, setCompanyNames] = useState([]);

    const { data: companyData, isLoading, error } = useFetch(`${process.env.REACT_APP_API}/api/companies`);

    useEffect(() => {
        if (companyData.length != 0) {
            let companyNameId = companyData.reduce((pre, ele) => {
                const { longName, _id } = ele;
                pre.push({ longName, _id });
                return pre;
            }, []);
            setCompanyNames(companyNameId);
        }
    }, [companyData]);

    return (
        <DataContext.Provider
            value={{
                companyDataContext: { companyData, companyNames, isLoading, error },
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
};

export { DataContext, DataContextProvider };
