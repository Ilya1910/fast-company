import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [profession, setProfession] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getProfessionList();
    }, []);

    async function getProfessionList() {
        try {
            const { content } = await professionService.get();
            setProfession(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }

    function getProfession(id) {
        return profession.find((p) => p._id === id);
    }

    return (
        <ProfessionContext.Provider
            value={{ isLoading, profession, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
