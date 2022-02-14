import React from "react";

const ErrorFlash = ({ error, deletedError }) => {
    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            <strong className="alert-heading">{error}</strong>
            <button
                type="button"
                onClick={() => deletedError(null)}
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
            ></button>
        </div>
    );
};

export default ErrorFlash;
