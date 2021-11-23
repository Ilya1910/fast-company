import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";
import Loading from "../../common/loading";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();
    const qual = qualities.map((q) => getQuality(q));
    if (!isLoading) {
        return (
            <>
                {qual.map((q) => (
                    <Quality key={q._id} {...q} />
                ))}
            </>
        );
    } else return <Loading />;
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
