import React, { useState } from "react";
import API from "../api";
import User from "./user";
import Context from "../context";
import renderPhrase from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll());
    const [currentPage, setCurrentPage] = useState(1);
    const count = users.length;
    const pageSize = 4;
    const userCrop = paginate(users, currentPage, pageSize);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

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

    if (count === 0) {
        return <>{renderPhrase(count)}</>;
    } else {
        return (
            <Context.Provider value={{ handleDelete }}>
                <h2>{renderPhrase(count)}</h2>
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
                        {userCrop.map((user) => {
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
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </Context.Provider>
        );
    }
};

export default Users;
