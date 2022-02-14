import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ErrorFlash from "./ErrorFlash";

const UserLogin = (props) => {
    const { loginContext, controlContext } = useContext(AuthContext);
    const { loginDetail, setloginDetail, logIn } = loginContext;
    const { error, setError, alert, setAlert } = controlContext;
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setError(null);
        return () => {};
    }, [loginDetail]);

    const handleUpdate = (evt) => {
        setloginDetail({ ...loginDetail, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setSubmitting(true);

        try {
            let data = await logIn();

            console.log(alert);
            props.history.goBack();
        } catch (error) {
            console.log(error);
        }

        setSubmitting(false);
    };

    return (
        <div className="row col-8 offset-2 my-5">
            {error && <ErrorFlash deletedError={setError} error={error} />}
            <form className="validated-form" onSubmit={handleSubmit}>
                <h3 className="text-center">User Login</h3>
                <section className="col-12 mt-5">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">
                            User Name
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="username"
                            value={loginDetail.username}
                            onChange={handleUpdate}
                            aria-describedby="userNameHelp"
                            name="username"
                            required
                        />
                        <div id="emailHelp" className="form-text">
                            Your user name must be unique.
                        </div>
                    </div>
                </section>
                <section className="row g-3 mb-5">
                    <div className="col row-cols-lg-auto">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <div className="input-group">
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={loginDetail.password}
                                onChange={handleUpdate}
                                name="password"
                                aria-describedby="passwordHelpBlock"
                                required
                            />
                        </div>
                        <div id="passwordHelpBlock" className="form-text">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not
                            contain spaces, special characters, or emoji.
                        </div>
                    </div>
                </section>
                <div className="d-grid gap-2 col-2 mx-auto px-1">
                    {!submitting && <button className="btn btn-outline-info rounded">Log In</button>}
                    {submitting && (
                        <button className="btn btn-primary rounded" disabled>
                            Submitting...
                        </button>
                    )}
                </div>
            </form>

            <div className="row col-8 offset-2 mt-5 sign_up_link">
                <div className="alert alert-info fs-5" role="alert">
                    Or click
                    <Link className="text-decoration-none" to="/user/register">
                        {" "}
                        here{" "}
                    </Link>
                    to create your free account.
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
