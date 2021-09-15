import React, { useState, useEffect } from "react";
import Users from "./components/users";
import Context from "./context";
import API from "./api";

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        API.users.default.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleStatus = (userId) => {
        setUsers(
            users.map((user) => {
                if (user._id === userId) {
                    return { ...user, status: !user.status };
                }
                return user;
            })
        );
    };

    return (
        <Context.Provider value={{ handleDelete }}>
            <Users
                onDelete={handleDelete}
                users={users}
                handleStatus={handleStatus}
            />
        </Context.Provider>
    );
}

export default App;
