import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
    const { authDetailsContext, loginContext } = useContext(AuthContext);
    const [authDetail, setAuthDetail] = authDetailsContext;
    const { logOut } = loginContext;

    const handleLogOut = async () => {
        let data = await logOut();
        setAuthDetail({ ...data });
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid px-5 py-2 fs-5">
                <Link className="navbar-brand fs-3 text-warning fw-bolder" to="/">
                    Kev's CompanyViewer
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-decoration-none text-info" to="/companies">
                                All Companies
                            </Link>
                        </li>
                        <li className="nav-item">
                            {authDetail.username ? (
                                <Link className="nav-link text-decoration-none text-info" to="/companies/create">
                                    New Company
                                </Link>
                            ) : (
                                <Link
                                    className="nav-link text-decoration-none text-info"
                                    to="/user/login"
                                    onClick={() => {
                                        alert("Please login first");
                                    }}
                                >
                                    New Company
                                </Link>
                            )}
                        </li>
                    </ul>
                    <SearchBar />
                </div>
                {authDetail.username ? (
                    <section className="ms-2 me-0">
                        <Link className="btn btn-outline-info" to="/user/login" onClick={handleLogOut}>
                            Logout
                        </Link>
                    </section>
                ) : (
                    <section className="ms-2 me-0">
                        <Link className="btn btn-outline-info" to="/user/login">
                            Login
                        </Link>
                    </section>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
