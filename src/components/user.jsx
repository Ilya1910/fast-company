import React, { useEffect, useState } from "react";
import API from "../api";
import Loading from "./loading";
import Quality from "./qualitie";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const User = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(async () => {
        const user = await API.users.default.getById(userId);
        setUser(user);
    }, []);

    if (!user) return <Loading />;

    const { name, qualities, profession, completedMeetings, rate } = user;

    return (
        <>
            <h2>{name}</h2>
            {qualities.map((qualitie) => (
                <Quality key={qualitie._id} {...qualitie} />
            ))}
            <h3>Профессия: {profession.name}</h3>
            <p>completedMeetings: {completedMeetings}</p>
            <h4>Rate {rate}</h4>
            <button onClick={() => history.replace("/users")}>
                Все пользователи
            </button>
        </>
    );
};
User.propTypes = {
    userId: PropTypes.string.isRequired
};

export default User;
