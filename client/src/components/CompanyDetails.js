import React, { useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "../context/AuthContext";
import Spinner from "./Spinner";

const CompanyDetails = () => {
    const { authDetailsContext } = useContext(AuthContext);
    const [authDetail] = authDetailsContext;

    const { id } = useParams(); // extract id in the route;

    const history = useHistory();
    const { data: targetCompany, isLoading, error } = useFetch(`${process.env.REACT_APP_API}/api/companies/${id}`);

    const handleDelete = () => {
        fetch(`${process.env.REACT_APP_API}/api/companies/${id}`, { method: "DELETE", credentials: "include" }).then(
            () => {
                history.push("/companies");
            }
        );
    };

    const getNumberUnit = function (num) {
        var units = ["Million", "Billion", "Trillion", "Quadrillion", "Quintillion", "Sextillion"];
        var unit = Math.floor((num / 1.0e1).toFixed(0).toString().length);
        var r = unit % 3;
        var x = Math.abs(Number(num)) / Number("1.0e+" + (unit - r)).toFixed(2);
        return x.toFixed(2) + " " + units[Math.floor(unit / 3) - 2];
    };

    return (
        <div className="company-details my-5">
            {isLoading && <Spinner />}
            {error && <div>{error}</div>}
            {targetCompany && (
                <article>
                    <div className="row col-8 offset-2">
                        <div className="card mb-5">
                            <div className="row mb-3">
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title fs-2 mb-3">{targetCompany.longName}</h5>
                                        <p className="card-text mb-5">{targetCompany.longBusinessSummary}</p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                Headquarter:
                                                {targetCompany.address
                                                    ? ` ${targetCompany.address}, ${targetCompany.city},
                                                ${targetCompany.state}, ${targetCompany.country}`
                                                    : " NA"}
                                            </small>
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="col-md-4 text-end"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <img src={targetCompany.logo_url} alt="" />
                                </div>
                            </div>
                            <div className="card-group mt-3 mb-5">
                                <div className="card border-light">
                                    <div className="card-header">
                                        <h3 className="text-primary">Ticker: {targetCompany.symbol}</h3>
                                    </div>
                                    <div className="card-body text-dark">
                                        <h5>Current Price:</h5>
                                        <h5 className="text-end mb-2 text-success">
                                            ${`${targetCompany.currentPrice}`} ({targetCompany.currency})
                                        </h5>

                                        <h5>Market Cap:</h5>
                                        <h6 className="text-end mb-2 text-success">
                                            {targetCompany.currency} ${getNumberUnit(targetCompany.marketCap)}
                                        </h6>

                                        <p className="card-text">
                                            <small className="text-muted">Last updated 5 days ago</small>
                                        </p>
                                    </div>
                                </div>
                                <div className="card border-light text-dark">
                                    <div className="card-header">
                                        <h3 className="text-primary">Basic Infomation</h3>
                                    </div>
                                    <div className="card-body">
                                        <h5>Full-Time Employees:</h5>
                                        <h5 className="text-end mb-2 text-success">
                                            {`${targetCompany.fullTimeEmployees}`}
                                        </h5>
                                        <h5>Sector:</h5>
                                        <h6 className="text-end mb-2 text-success">{targetCompany.sector}</h6>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="card-title mb-3">Company Financials</h3>
                                <table className="table mb-5">
                                    <thead>
                                        <tr className="table-secondary">
                                            <th scope="col">PE Ratio</th>
                                            <th scope="col">Debt To Equity Ratio</th>
                                            <th scope="col">Return On Equity</th>
                                            <th scope="col">Dividend Yield</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="table-light">
                                            <td>{`${Math.round(targetCompany.trailingPE * 100) / 100}`}</td>
                                            <td>{`${Math.round(targetCompany.debtToEquity * 100) / 100}`}</td>
                                            <td>{`${Math.round(targetCompany.returnOnEquity * 1000) / 10}`}%</td>
                                            <td colSpan="2">
                                                {`${Math.round(targetCompany.dividendYield * 10000) / 100}`}%
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {authDetail && authDetail.username === "admin" ? (
                                <div className="d-grid gap-2 d-md-flex justify-content-sm-end mb-3">
                                    <Link
                                        className="text-decoration-none btn btn-warning btn-sm text-light"
                                        to={`/companies/${targetCompany._id}/edit`}
                                    >
                                        Edit
                                    </Link>

                                    <button className="btn btn-danger btn-sm text-light" onClick={handleDelete}>
                                        Delete
                                    </button>
                                </div>
                            ) : (
                                <div className="d-grid gap-2 d-md-flex justify-content-sm-end mb-3">
                                    <Link
                                        className="text-decoration-none btn btn-warning btn-sm text-light"
                                        to="/user/login"
                                        onClick={() => {
                                            alert("Please login first");
                                        }}
                                    >
                                        Edit
                                    </Link>

                                    <Link
                                        className="btn btn-danger btn-sm text-light"
                                        onClick={() => {
                                            alert("Please login first");
                                        }}
                                        to="/user/login"
                                    >
                                        Delete
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            )}
        </div>
    );
};

export default CompanyDetails;
