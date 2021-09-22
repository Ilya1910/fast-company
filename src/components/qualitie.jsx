import React from "react";
import { classesBadge } from "./searchStatus";
import PropTypes from "prop-types";

const Qualitie = ({ color, name, _id }) => (
    <span key={_id} className={classesBadge(color)}>
        {name}
    </span>
);

Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default Qualitie;
