import PropTypes from "prop-types";

import { makeConcurrentRequest } from "@utils/network";
import { useState, useEffect } from "react";

import styles from "./PersonFilms.module.css";

const PersonFilms = ({ personFilms }) => {
    const [filmsInfo, setFilmsInfo] = useState([]);

    useEffect(() => {
        (async () => {
            // const filmsHTTPS = personFilms.map((url) => changeHTTP(url));    //changeHTTP надо импортировать
            const response = await makeConcurrentRequest(personFilms);

            setFilmsInfo(response);
        })();
    }, []);

    return (
        <div className={styles.wrapper}>
            <ul className={styles.list__container}>
                {filmsInfo
                    .sort((a, b) => a.episode_id - b.episode_id)
                    .map(({ title, episode_id }) => (
                        <li className={styles.list__item} key={episode_id}>
                            <span className={styles.item__episode}>Episode {episode_id}</span>
                            <span className={styles.colon}> : </span>
                            <span className={styles.title}> {title} </span>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

PersonFilms.propTypes = {
    personFilms: PropTypes.array,
};

export default PersonFilms;
