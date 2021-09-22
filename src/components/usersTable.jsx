import React, { useContext } from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import { classesBadge } from "./searchStatus";
import Context from "../context";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({ users, onSort, selectedSort, handleStatus }) => {
    const { handleDelete } = useContext(Context);
    const columns = {
        name: {
            path: "name",
            name: "Имя"
        },
        qualities: {
            name: "Качества",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: {
            path: "profession.name",
            name: "Профессия"
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: {
            path: "rate",
            name: "Оценка"
        },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <button onClick={() => handleStatus(user._id)}>
                    <BookMark status={user.status} />
                </button>
            )
        },
        delete: {
            path: "",
            name: "",
            component: (user) => (
                <button
                    className={classesBadge("danger")}
                    onClick={() => handleDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };

    return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    handleStatus: PropTypes.func.isRequired
};

export default UserTable;
