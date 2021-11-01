import React from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils/plural";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) =>
        plural(
            "человек тусанет",
            "человека тусанут",
            "человек тусанет",
            number
        );

    return (
        <h2>
            <span
                className={"badge " + (length > 0 ? "bg-primary" : "bg-danger")}
            >
                {length > 0
                    ? `${length + " " + renderPhrase(length)}   с тобой сегодня`
                    : "Никто с тобой не тусанет"}
            </span>
        </h2>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number
};

export default SearchStatus;
