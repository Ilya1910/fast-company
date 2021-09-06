import React from "react";
import { classesBadge } from "./user";

const renderPhrase = (length) => {
    return (
        <span className={classesBadge(length !== 0 ? "primary" : "danger")}>
            {length !== 0
                ? `${length} человек тусанет с тобой сегодня`
                : "Никто с тобой не тусанет"}
        </span>
    );
};

export default renderPhrase;
