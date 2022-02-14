import React from "react";
import { Link } from "react-router-dom";
import "./CompanyList.css";

const CompanyList = ({ companyList, title }) => {
    const renderedCompanyList = companyList.map((company) => {
        return (
            <div className="company-preview card row g-0 border-light" key={company.symbol}>
                {/* <div className="col-md-2 text-center">{company.symbol && <img src={company.symbol} alt="" />}</div> */}
                <Link className="card-header text-decoration-none" to={`/companies/${company._id}`}>
                    <h2 className="fs-2 fw-bold">{company.longName}</h2>
                </Link>
                <div>
                    <div className="card-body d-flex flex-column">
                        <section className="card-title">
                            <span className="card-text mb-5">
                                {company.longBusinessSummary.length > 200
                                    ? company.longBusinessSummary.substring(0, 200) + "......"
                                    : company.longBusinessSummary}
                            </span>
                        </section>
                        <section className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <Link to={`/companies/${company._id}`}>
                                <button className="btn btn-outline-primary btn-sm">View {company.longName}</button>
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="company-list mb-3 px-4 d-grid gap-3">
            <p className="company-list-title mt-5 mb-3 fs-1 fw-bold text-center">{title}</p>
            {renderedCompanyList}
        </div>
    );
};

export default CompanyList;
