import "./Spinner.css";
import React from "react";

const Spinner = ({ warning }) => {
    return (
        <div>
            <div className="spinner">
                <div className="spinner-border text-info" style={{ width: "3rem", height: "3rem" }} role="status"></div>
                {warning && (
                    <div className="text-center text-light">
                        <strong>{warning}</strong>
                    </div>
                )}
            </div>
        </div>
    );
};

// This is a default value of certain props you want to put here in case if forget to adding any props in React Main <App /> Component
Spinner.defaultProps = {
    warning: "Loading...",
};

export default Spinner;
