import React, { useContext } from "react";
import Context from "../context";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

export function classesBadge(badgeClassName) {
    return `badge badge-margin bg-${badgeClassName}`;
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    qualities: PropTypes.string.isRequired,
    profession: PropTypes.string.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    _id: PropTypes.string.isRequired,
    handleStatus: PropTypes.bool.isRequired,
    status: PropTypes.bool.isRequired
};

export default function User({
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    _id,
    handleStatus,
    status
}) {
    const { handleDelete } = useContext(Context);
    return (
        <tr>
            <td>{name}</td>
            <td>{qualities.map(Qualitie)}</td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <button onClick={() => handleStatus(_id)}>
                    <BookMark status={status} />
                </button>
            </td>
            <td>
                <button
                    className={classesBadge("danger")}
                    onClick={() => handleDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
}
