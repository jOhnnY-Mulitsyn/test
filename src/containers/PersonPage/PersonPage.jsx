import PropTypes from "prop-types";
import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import { withErrorApi } from "@hoc-helpers/withErrorApi";

import PersonInfo from "@components/PersonPage/PersonInfo";
import PersonPhoto from "@components/PersonPage/PersonPhoto";
import PersonLinkBack from "@components/PersonPage/PersonLinkBack";
// import PersonFilms from "@components/PersonPage/PersonFilms";

import UiLoading from "@ui/UiLoading";

import { getApiResource } from "@utils/network";
import { getPeopleImage } from "@services/getPeopleData";
import { API_PERSON } from "@constants/api";

import styles from "./PersonPage.module.css";

const PersonFilms = React.lazy(() => import("@components/PersonPage/PersonFilms"));

const PersonPage = ({ setErrorApi }) => {
    const { id } = useParams();
    const [personId, setPersonId] = useState(null);
    const [personInfo, setPersonInfo] = useState(null);
    const [personName, setPersonName] = useState(null);
    const [personPhoto, setPersonPhoto] = useState(null);
    const [personFilms, setPersonFilms] = useState(null);
    const [personFavorite, setPersonFavorite] = useState(false);

    const storeData = useSelector(store => store.favoriteReducer);


    useEffect(() => {
        (async () => {
            const res = await getApiResource(`${API_PERSON}/${id}/`);

            storeData[id] ? setPersonFavorite(true) : setPersonFavorite(false);
            setPersonId(id);

            if (res) {
                setPersonInfo([
                    { title: "Birth year", data: res.birth_year },
                    { title: "Gender", data: res.gender },
                    { title: "Mass", data: res.mass },
                    { title: "Height", data: res.height },
                    { title: "Skin color", data: res.skin_color },
                    { title: "Hair color", data: res.hair_color },
                    { title: "Eye color", data: res.eye_color },
                ]);

                setPersonName(res.name);
                setPersonPhoto(getPeopleImage(id));

                res.films.length && setPersonFilms(res.films);

                setErrorApi(false);
            } else {
                setErrorApi(true);
            }
        })();
    }, []);

    return (
        <>
            <PersonLinkBack />

            <div className={styles.wrapper}>
                <span className={styles.person__name}>{personName}</span>
                <div className={styles.container}>
                    <PersonPhoto 
                        personPhoto={personPhoto} 
                        personName={personName} 
                        personId={personId} 
                        personFavorite={personFavorite} 
                        setPersonFavorite={setPersonFavorite} 
                    />

                    {personInfo && <PersonInfo personInfo={personInfo} />}

                    {personFilms && (
                        <Suspense fallback={<UiLoading />}>
                            <PersonFilms personFilms={personFilms} />
                        </Suspense>
                    )}
                </div>
            </div>
        </>
    );
};

PersonPage.propTypes = {
    setErrorApi: PropTypes.func,
};

export default withErrorApi(PersonPage);
