import React from "react";
import "./Alert.css";

const Alert = ({ alert }) => {
    return (
        <div className="alert-div row col-6 offset-3 mt-1">
            <div className="alert alert-info alert-dismissible fade show" role="alert">
                <strong className="alert-heading">{alert}</strong>
            </div>
        </div>
    );
};

export default Alert;
