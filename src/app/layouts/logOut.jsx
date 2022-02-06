import { useAuth } from "../hooks/useAuth";
import React, { useEffect } from "react";

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => {
        logOut();
    }, []);

    return <h1>Loading...</h1>;
};

export default LogOut;
