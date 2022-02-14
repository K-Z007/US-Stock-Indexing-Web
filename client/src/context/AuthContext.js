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
                    // console.log(res);
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
                    // console.log(err);
                    setError(err.message);
                    return reject(err);
                });
        });
    };

    useEffect(() => {
        authDetail.isAuthenticated && setAlert(`Welcome back ${authDetail.username}`);
    }, [authDetail]);

    // console.log(alert);

    const logOut = async () => {
        let res = await fetch(`${process.env.REACT_APP_API}/api/user/logout`, {
            method: "GET",
            credentials: "include",
        });
        return res;
    };

    const readSession = async () => {
        // When withCredentials is set to true, it is trying to send credentials or
        // cookies along with the request. As that means another origin is potentially
        // trying to do authenticated requests:
        /*
            omit: Never send or receive cookies.
            same-origin: Send user credentials (cookies, basic http auth, etc..) if the URL is on the same origin as the calling script. This is the default value.
            include: Always send user credentials (cookies, basic http auth, etc..), even for cross-origin calls.
        */
        try {
            let res = await fetch(`${process.env.REACT_APP_API}/api/user`, {
                method: "GET",
                credentials: "include",
            });
            // console.log(res);
            let data = await res.json();
            // console.log("res::data::");
            // console.log(data);
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

    // console.log(alert);

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
