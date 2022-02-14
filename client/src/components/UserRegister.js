import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import ErrorFlash from "./ErrorFlash";

const UserRegister = () => {
    const mounted = useRef(true);
    const history = useHistory();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState({
        user: {
            username: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        mounted.current = true;
        mounted.current && setError(null);

        return () => {};
    }, [user]);

    const handleUpdate = (evt) => {
        setUser((prevState) => ({
            user: {
                ...prevState.user,
                [evt.target.id]: evt.target.value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let statusCode = 0;
        setSubmitting(true);

        fetch(`${process.env.REACT_APP_API}/api/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })
            .then((res) => {
                if (!res.ok) {
                    statusCode = res.status;
                    return res.json();
                }
                setError(null);
                history.push("/");
            })
            .then((data) => {
                setSubmitting(false);
                switch (statusCode) {
                    case 400:
                        console.log("Register failed");
                        console.log(data);
                        setError(data.error.message);
                        break;
                    case 500:
                        console.log("server error, try again");
                        setError(data.error.message);
                        break;
                    default:
                        console.log("unhandled");
                        break;
                }
            })
            .catch((err) => {
                // console.log(err);
                setSubmitting(false);
            });
    };

    return (
        <div className="row col-8 offset-2 my-5">
            {error && <ErrorFlash deletedError={setError} error={error} />}
            <form className="validated-form" onSubmit={handleSubmit}>
                <h3>User Registration</h3>
                <section className="col-12 mt-5">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">
                            User Name
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            id="username"
                            value={user.user.username}
                            onChange={handleUpdate}
                            aria-describedby="userNameHelp"
                            required
                        />
                        <div id="emailHelp" className="form-text">
                            Your user name must be unique.
                        </div>
                    </div>
                </section>
                <section className="col-12">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                            Email address
                        </label>
                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            value={user.user.email}
                            onChange={handleUpdate}
                            aria-describedby="emailHelp"
                            required
                        />
                        <div id="emailHelp" className="form-text">
                            Your email will be safe with us.
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
                                type="text"
                                className="form-control"
                                id="password"
                                value={user.user.password}
                                onChange={handleUpdate}
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
                {!submitting && <button className="bn btn-primary rounded">Sign Up</button>}
                {submitting && (
                    <button className="bn btn-primary rounded" disabled>
                        Submitting...
                    </button>
                )}
            </form>
        </div>
    );
};

export default UserRegister;
