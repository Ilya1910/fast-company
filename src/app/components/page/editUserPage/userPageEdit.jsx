import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import API from "../../../../API";
import { validator } from "../../../utils/validator";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../../common/loading";
import BackHistoryButton from "../../common/backButton";

const UserPageEdit = () => {
    const validatorConfig = {
        name: {
            isRequired: { message: "Имя обязательно для заполнения" }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "email введен некорректно"
            }
        },
        professions: {
            isRequired: { message: "Обязательно выберите вашу профессию" }
        }
    };
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [qualities, setQualities] = useState({});
    const history = useHistory();
    const { userId } = useParams();
    const [isLoading, setIsLoading] = useState();
    const [professions, setProfessions] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setIsLoading(true);
        API.users.getById(userId).then(({ profession, ...data }) => {
            setData((prevState) => ({
                ...prevState,
                ...data,
                profession: profession._id
            }));
        });
        API.professions.fetchAll().then((data) => setProfessions(data));
        API.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const getProfessionById = (id) => {
        for (const prof in professions) {
            const profData = professions[prof];
            if (profData._id === id) return profData;
        }
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const qual in qualities) {
            for (let i = 0; i < elements.length; i++) {
                if (qualities[qual]._id === elements[i].value) {
                    qualitiesArray.push(qualities[qual]);
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length !== 0;

    useEffect(() => {
        validate();
    }, [data]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        API.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
    };

    if (!isLoading && Object.keys(professions).length > 0) {
        return (
            <div className="container mt-5">
                <BackHistoryButton />
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                placeholder="Введите Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                placeholder="Введите электронную почту"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите вашу профессию"
                                value={data.profession._id}
                                error={errors.profession}
                                defaultOption="Choose..."
                                options={professions}
                                onChange={handleChange}
                                name="profession"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                                defaultValue={data.qualities}
                            />
                            <button
                                type="submit"
                                disabled={isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return <Loading />;
};

export default UserPageEdit;
