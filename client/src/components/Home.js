import React, { useContext, useEffect } from "react";
import CompanyList from "./CompanyList";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";
import Alert from "./Alert";
import Spinner from "./Spinner";

const Home = () => {
    const { controlContext } = useContext(AuthContext);
    const { alert, setAlert } = controlContext;
    const { companyDataContext } = useContext(DataContext);
    const { companyData, isLoading, error } = companyDataContext;

    useEffect(() => {
        let alertDiv = document.querySelector(".alert-div");
        if (alert) {
            alertDiv.classList.toggle("closeAlert");
            setTimeout(() => {
                alertDiv.classList.toggle("closeAlert");
            }, 3000);
        }
        setTimeout(() => {
            setAlert(null);
            alertDiv && alertDiv.remove();
        }, 5000);
    }, [alert]);

    // console.log(alert);

    return (
        <div className="Home">
            {alert && <Alert alert={alert} />}
            {error && <div>{error}</div>}
            {isLoading && <Spinner />}
            {companyData && <CompanyList companyList={companyData} title={`All 500 Listed US Companies`} />}
        </div>
    );
};

export default Home;
