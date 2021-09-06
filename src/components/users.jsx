import React, { useState } from "react";
import API from "../api";
import User from "./user";
import Context from "../context";
import renderPhrase from "./searchStatus";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleStatus = (userId) => {
        setUsers(
            users.map((user) =>
                user._id === userId
                    ? { ...user, status: !user.status }
                    : { ...user }
            )
        );
    };

    if (users.length === 0) {
        return <>{renderPhrase(users.length)}</>;
    } else {
        return (
            <Context.Provider value={{ handleDelete }}>
                <h2>{renderPhrase(users.length)}</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <User
                                    {...user}
                                    key={user._id}
                                    handleStatus={handleStatus}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </Context.Provider>
        );
    }
};

export default Users;
