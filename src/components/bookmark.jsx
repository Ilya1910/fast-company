import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status }) => (
    <i className={`bi bi-bookmark${status ? "-fill" : ""}`}></i>
);

BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default BookMark;
