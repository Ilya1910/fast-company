import React, { useState } from "react";
import API from "../api";
import User from "./user";
import Context from "../context";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll());

    function addClasses(badgeClassName) {
        return `badge bg-${badgeClassName}`;
    }

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const renderPhrase = () => {
        return (
            <span
                className={addClasses(
                    users.length !== 0 ? "primary" : "danger"
                )}
            >
                {users.length !== 0
                    ? `${users.length} человек тусанет с тобой сегодня `
                    : "Никто с тобой не тусанет"}
            </span>
        );
    };

    if (users.length === 0) {
        return <>{renderPhrase()}</>;
    } else {
        return (
            <Context.Provider value={{ handleDelete }}>
                {renderPhrase()}

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return <User user={user} key={user._id} />;
                        })}
                    </tbody>
                </table>
            </Context.Provider>
        );
    }
};

export default Users;
