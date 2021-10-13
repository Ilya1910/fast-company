import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import _ from "lodash";
import UserTable from "./usersTable";
import API from "../api";
import Loading from "./loading";
import Context from "../context";
import TextField from "./textField";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const pageSize = 4;
    const [users, setUsers] = useState();
    const [search, setSearch] = useState("");

    useEffect(() => {
        API.users.default.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleStatus = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, status: !user.status };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfession(data));
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearch("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleSearchChange = ({ target }) => {
        setSelectedProf();
        setSearch(target.value);
    };

    if (users) {
        const searchUsers = _.filter(users, (user) => {
            if (user.name.toLowerCase().includes(search.toLowerCase())) {
                return user;
            }
        });
        const filteredUsers = selectedProf
            ? users.filter((user) => _.isEqual(user.profession, selectedProf))
            : searchUsers;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const cleanFilter = () => {
            setSelectedProf();
        };

        return (
            <Context.Provider value={{ handleDelete }}>
                <div className="d-flex">
                    {professions && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                selectedItem={selectedProf}
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                            />
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={cleanFilter}
                            >
                                Очистить
                            </button>
                        </div>
                    )}
                    <div className="d-flex flex-column">
                        <SearchStatus length={count} />
                        <TextField
                            placeholder="Search..."
                            name="search"
                            value={search}
                            onChange={handleSearchChange}
                        />
                        {count > 0 && (
                            <UserTable
                                users={usersCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                                handleStatus={handleStatus}
                            />
                        )}
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </Context.Provider>
        );
    }
    return <Loading />;
};

UsersList.defaultProps = {
    count: 0
};

UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;
