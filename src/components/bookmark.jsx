import React from "react";

const BookMark = ({ status }) => (
    <i className={`bi bi-bookmark${status ? "-fill" : ""}`}></i>
);

export default BookMark;
