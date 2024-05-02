import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PeopleList from '@components/PeoplePage/PeopleList'

import styles from './FavoritePage.module.css';


const FavoritePage = () => {
    const [people, setPeople] = useState([]);

    const storeData = useSelector(store => store.favoriteReducer);


    useEffect(() => {
        const arr = Object.entries(storeData);
        
        if (arr.length) {
            const result = arr.map(item => {
                return {
                    id: item[0],
                    ...item[1],
                }
            })

            setPeople(result);
        }
    }, [])

    return (
        <>
            <h1 className='header__text'>My favorites:</h1>
            {people.length
                ? <PeopleList people={ people } />
                : <h2 className={styles.comment}>No data</h2>
            }
        </>
    )
};

export default FavoritePage;