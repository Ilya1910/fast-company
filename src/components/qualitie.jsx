import React from "react";
import { classesBadge } from "./user";

const Qualitie = ({ color, name, _id }) => (
    <span key={_id} className={classesBadge(color)}>
        {name}
    </span>
);

export default Qualitie;
