import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(null);
    const [authDetail, setAuthDetail] = useState({
        username: "",
        userId: "",
        isAuthenticated: false,
    });

    const [loginDetail, setloginDetail] = useState({
        username: "",
        password: "",
    });

    const logIn = () => {
        return new Promise((reslove, reject) => {
            fetch(`${process.env.REACT_APP_API}/api/user/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginDetail),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Username or password is incorrect");
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    setAuthDetail({ ...data });
                    return reslove("Welcome back");
                })
                .catch((err) => {
                    setError(err.message);
                    return reject(err);
                });
        });
    };

    useEffect(() => {
        authDetail.isAuthenticated && setAlert(`Welcome back ${authDetail.username}`);
    }, [authDetail]);

    const logOut = async () => {
        let res = await fetch(`${process.env.REACT_APP_API}/api/user/logout`, {
            method: "GET",
            credentials: "include",
        });
        return res;
    };

    const readSession = async () => {
        try {
            let res = await fetch(`${process.env.REACT_APP_API}/api/user`, {
                method: "GET",
                credentials: "include",
            });

            let data = await res.json();

            if (data.isAuthenticated) {
                setAuthDetail({ ...data });
            }
        } catch (error) {
            // console.log(error);
        }
    };

    // context component did mount then fetch the user data;
    useEffect(() => {
        readSession();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authDetailsContext: [authDetail, setAuthDetail],
                loginContext: { loginDetail, setloginDetail, logIn, logOut },
                controlContext: { error, setError, alert, setAlert },
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
