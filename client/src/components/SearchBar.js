import React, { useState, useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import "./SearchBar.css";

const SearchBar = () => {
    const { companyDataContext } = useContext(DataContext);
    const { companyNames } = companyDataContext;
    const [filteredNames, setFilteredNames] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        let newFilter = companyNames.filter((ele) => {
            return ele.longName.toLowerCase().includes(searchInput.toLowerCase());
        });
        searchInput ? setFilteredNames(newFilter) : setFilteredNames([]);
    }, [searchInput]);

    return (
        <form className="navForm d-flex">
            <div className="input-group">
                <input
                    className="form-control form-control border-right-0"
                    type="text"
                    placeholder="Search By Company Name"
                    value={searchInput}
                    aria-label="Search"
                    onChange={(evt) => setSearchInput(evt.target.value)}
                />
                <span className="input-group-append bg-white">
                    <button className="btn btn-outline-dark border border-left-0">
                        {!searchInput ? (
                            <i className="bi bi-search"></i>
                        ) : (
                            <i
                                className="bi bi-x-lg"
                                onClick={(evt) => {
                                    evt.preventDefault();
                                    setSearchInput("");
                                }}
                            ></i>
                        )}
                    </button>
                </span>
            </div>
            <div className="list-group">
                {filteredNames.length != 0 &&
                    filteredNames.slice(0, 11).map((company, key) => {
                        return (
                            <Link
                                key={key}
                                className="dataItem"
                                to={`/companies/${company._id}`}
                                onClick={(evt) => {
                                    setSearchInput("");
                                }}
                            >
                                <p className="pt-2">{company.longName}</p>
                            </Link>
                        );
                    })}
            </div>
        </form>
    );
};

export default withRouter(SearchBar);
