import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import Spinner from "./Spinner";

const CompanyEdit = () => {
    const { id } = useParams();
    const history = useHistory();
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [company, setCompany] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/api/companies/${id}/edit`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                setCompany(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log("Fetch error: " + err);
            });
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setIsPending(true);

        fetch(`${process.env.REACT_APP_API}/api/companies/${id}/edit`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(company),
        }).then(() => {
            setIsPending(false);
            history.push("/");
        });
    };

    return (
        <React.Fragment>
            {isLoading && <Spinner />}
            {company && (
                <div className="row col-8 offset-2 my-5">
                    <form className="validated-form" onSubmit={handleSubmit}>
                        <h3>Baic Infomation</h3>
                        <section className="col-12">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="longName">
                                    Company Name
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="longName"
                                    value={company.longName}
                                    onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                    required
                                />
                            </div>
                        </section>
                        <section className="row g-3 mb-5">
                            <div className="col row-cols-lg-auto">
                                <label className="form-label" htmlFor="symbol">
                                    Stock Ticker
                                </label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="symbol"
                                        value={company.symbol}
                                        onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col col-lg-2">
                                <label className="form-label" htmlFor="currency">
                                    Currency
                                </label>
                                <div className="input-group">
                                    <select
                                        className="form-select"
                                        id="currency"
                                        value={company.currency}
                                        onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                    >
                                        <option value="USD">USD</option>
                                        <option value="AUD">AUD</option>
                                        <option value="JPY">JPY</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col col-lg-5">
                                <label className="form-label" htmlFor="currentPrice">
                                    Current Stock Price
                                </label>
                                <div className="input-group">
                                    <div className="input-group-text">$</div>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="currentPrice"
                                        value={company.currentPrice}
                                        onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                        step="0.01"
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        <section>
                            <h3>Company Infomation</h3>
                            <div className="row row-cols-lg-auto mb-3">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="sector">
                                        Sector
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="sector"
                                            value={company.sector}
                                            onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="fullTimeEmployees">
                                        Full-Time Employees
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="fullTimeEmployees"
                                            value={company.fullTimeEmployees}
                                            onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <section className="mb-3">
                                <label htmlFor="longBusinessSummary" className="form-label">
                                    Business Summary
                                </label>
                                <textarea
                                    className="form-control"
                                    id="longBusinessSummary"
                                    value={company.longBusinessSummary}
                                    onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                    rows="3"
                                    required
                                ></textarea>
                            </section>
                            <div className="col-12">
                                <section className="mb-3">
                                    <label className="form-label" htmlFor="Logo">
                                        Logo Link
                                    </label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        id="logo_url"
                                        value={company.logo_url}
                                        onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                    />
                                </section>
                            </div>
                        </section>

                        <section>
                            <h3>Company Financials</h3>
                            <div className=" row row-cols-lg-auto mb-3">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="trailingPE">
                                        PE Ratio
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="trailingPE"
                                            value={company.trailingPE}
                                            onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="debtToEquity">
                                        Debt To Equity Ratio
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="debtToEquity"
                                            value={company.debtToEquity}
                                            onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                            step="0.01"
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="returnOnEquity">
                                        Return On Equity
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="returnOnEquity"
                                            value={company.returnOnEquity}
                                            onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                            step="0.001"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row row-cols-lg-auto mb-5">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="marketCap">
                                        Market Cap
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="marketCap"
                                            value={company.marketCap}
                                            onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="dividendYield">
                                        Dividend Yield
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="dividendYield"
                                            value={company.dividendYield}
                                            onChange={(e) => setCompany({ ...company, [e.target.id]: e.target.value })}
                                            step="0.001"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {!isPending && (
                            <div className="d-grid gap-3 d-sm-block mb-5">
                                <button className="bn btn-warning rounded p-1">Edit Company</button>

                                <Link className="text-decoration-none" to={`/companies/${company._id}`}>
                                    <button className="bn btn-success rounded p-1">Cancel Edit</button>
                                </Link>
                            </div>
                        )}
                        {isPending && (
                            <button className="bn btn-success rounded p-1 mb-5" disabled>
                                Submitting...
                            </button>
                        )}
                    </form>
                </div>
            )}
        </React.Fragment>
    );
};

export default CompanyEdit;
