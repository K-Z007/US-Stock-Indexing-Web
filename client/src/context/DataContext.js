import React, { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const DataContext = createContext();

const DataContextProvider = (props) => {
    const [companyNames, setCompanyNames] = useState([]);

    // useFetch 里传入的地址必须match后端的地址port: 例如前端react虽然Port=3000但是这里的后端地址port是400
    // 而且必须的match后端的写好的route地址 "http://localhost:4000/companies"
    const { data: companyData, isLoading, error } = useFetch(`${process.env.REACT_APP_API}/api/companies`);

    useEffect(() => {
        if (companyData.length != 0) {
            let companyNameId = companyData.reduce((pre, ele) => {
                const { longName, _id } = ele; // destructing longName, _id from each element
                pre.push({ longName, _id });
                return pre;
            }, []);
            setCompanyNames(companyNameId);
        }

        // return () => {
        //     setCompanyNames("");
        // };
    }, [companyData]);

    // console.log("companyNames ::: " + companyNames.length);

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
