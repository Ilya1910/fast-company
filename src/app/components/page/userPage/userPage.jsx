import React, { useEffect, useState } from "react";
import API from "../../../../API";
import Loading from "../../common/loading";
import QualitiesList from "../../ui/qualities";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(async () => {
        const user = await API.users.getById(userId);
        setUser(user);
    }, []);

    if (!user) return <Loading />;

    const { name, qualities, profession, completedMeetings, rate } = user;

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card mb-3">
                        <div className="card-body">
                            <Link to={`${userId}/edit`}>
                                <button
                                    className="
                                        position-absolute
                                        top-0
                                        end-0
                                        btn btn-light btn-sm
                                    "
                                >
                                    <i className="bi bi-gear" />
                                </button>
                            </Link>
                            <div
                                className="
                                    d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative
                                "
                            >
                                <img
                                    src={`https://avatars.dicebear.com/api/avataaars/${(
                                        Math.random() + 1
                                    )
                                        .toString(36)
                                        .substring(7)}.svg`}
                                    className="rounded-circle"
                                    width="150"
                                    alt="Аватар пользователя"
                                />
                                <div className="mt-3">
                                    <h4>{name}</h4>
                                    <p className="text-secondary mb-1">
                                        {profession.name}
                                    </p>
                                    <div className="text-muted">
                                        <i
                                            className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                            role="button"
                                        />
                                        <i
                                            className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                            role="button"
                                        />
                                        <span className="ms-2">{rate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div
                            className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                        >
                            <h5 className="card-title">
                                <span>Qualities</span>
                            </h5>
                            <p className="card-text">
                                <QualitiesList qualities={qualities}/>
                            </p>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card mb-3">
                            <div
                                className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                            >
                                <h5 className="card-title">
                                    <span>Completed meetings</span>
                                </h5>

                                <h1 className="display-1">
                                    {completedMeetings}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary mt-3 me-3"
                        onClick={() => history.replace("/users")}
                    >
                        Все пользователи
                    </button>{" "}
                </div>

                <div className="col-md-8">
                    <Comments />
                </div>
            </div>
        </div>
    );
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
