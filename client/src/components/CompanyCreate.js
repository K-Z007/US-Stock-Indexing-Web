import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CompanyCreate = () => {
    const histroy = useHistory();
    const [isPending, setIsPending] = useState(false);

    const [company, setCompany] = useState({
        company: {
            longName: "",
            symbol: "",
            zip: "",
            sector: "",
            fullTimeEmployees: 0,
            longBusinessSummary: "",
            address: "",
            city: "",
            state: "",
            country: "",
            exchange: "",
            currentPrice: 0,
            currency: "USD",
            trailingPE: 0,
            debtToEquity: 0,
            returnOnEquity: 0,
            marketCap: 0,
            dividendYield: 0,
            logo_url: "",
        },
    });

    const handleUpdate = (evt) => {
        setCompany((prevState) => ({
            company: { ...prevState.company, [evt.target.id]: evt.target.value },
        }));
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        setIsPending(true);

        fetch(`${process.env.REACT_APP_API}/api/companies/create`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(company),
        }).then(() => {
            setIsPending(false);
            histroy.push("/"); // go back to main page once submitted
        });
    };

    return (
        <div className="row col-8 offset-2 my-5">
            <form className="validated-form" onSubmit={handleSumbit}>
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
                            onChange={handleUpdate}
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
                                onChange={handleUpdate}
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
                                onChange={handleUpdate}
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
                                onChange={handleUpdate}
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
                                    onChange={handleUpdate}
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
                                    onChange={handleUpdate}
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
                            onChange={handleUpdate}
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
                                onChange={handleUpdate}
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
                                    onChange={handleUpdate}
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
                                    onChange={handleUpdate}
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
                                    onChange={handleUpdate}
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
                                    onChange={handleUpdate}
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
                                    onChange={handleUpdate}
                                    step="0.001"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {!isPending && <button className="bn btn-success mb-5 rounded p-1">Create New Company</button>}
                {isPending && (
                    <button className="bn btn-success mb-5 rounded p-1" disabled>
                        Submitting...
                    </button>
                )}
            </form>
        </div>
    );
};

export default CompanyCreate;
