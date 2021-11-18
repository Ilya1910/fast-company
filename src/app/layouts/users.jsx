import React from "react";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import { useParams } from "react-router-dom";
import UserPageEdit from "../components/page/editUserPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const { userId, edit } = useParams();

    return (
        <UserProvider>
            {userId ? (
                edit ? (
                    <UserPageEdit userId={userId} />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    );
};

export default Users;
