import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...restProps }) => {
    const { authDetailsContext } = useContext(AuthContext);
    const [authDetail, setAuthDetail] = authDetailsContext;

    return (
        <Route
            {...restProps}
            render={(props) => (authDetail.isAuthenticated ? <Component {...props} /> : <Redirect to="/user/login" />)}
        />
    );
};

export default ProtectedRoute;
