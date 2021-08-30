import React, { useContext } from "react";
import Context from "../context";

function addClasses(badgeClassName) {
    return `badge bg-${badgeClassName}`;
}

export default function User({ user }) {
    const { handleDelete } = useContext(Context);

    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((qualitie, index) => {
                    return (
                        <span
                            key={index}
                            className={addClasses(qualitie.color)}
                        >
                            {qualitie.name}
                        </span>
                    );
                })}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <button
                    className="badge bg-danger"
                    style={{ border: "none" }}
                    onClick={() => handleDelete(user._id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
}
