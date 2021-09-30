import React from "react";
import User from "./user";
import UsersList from "./usersList";
import { useParams } from "react-router-dom";

const Users = () => {
    const { userId } = useParams();

    return userId ? <User userId={userId} /> : <UsersList />;
};

export default Users;
