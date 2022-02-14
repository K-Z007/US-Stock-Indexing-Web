const logIn = async () => {
    let res = await fetch(`${process.env.REACT_APP_API}/api/user`, {
        method: "GET",
        credentials: "include",
    });
    return res;
};

const logOut = async () => {
    let res = await fetch(`${process.env.REACT_APP_API}/api/user/logout`, {
        method: "GET",
        credentials: "include",
    });
    return res;
};

export { logIn, logOut };
