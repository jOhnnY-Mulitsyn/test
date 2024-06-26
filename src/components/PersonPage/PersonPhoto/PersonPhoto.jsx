import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { setPersonToFavorite, removePersonFromFavorite } from '@store/actions';

import iconFavorite from './img/favorite.png';
import iconFavoriteFill from './img/favorite-fill.png';

import styles from './PersonPhoto.module.css';

const PersonPhoto = ({ 
    personPhoto, 
    personName, 
    personId,
    personFavorite,
    setPersonFavorite, 
}) => {
    const dispatch = useDispatch();

    const dispatchFavoritePeople = () => {
        if (personFavorite) {
            dispatch(removePersonFromFavorite(personId));
            setPersonFavorite(false);
        } else {
            dispatch(setPersonToFavorite({
                [personId]: {
                    name: personName,
                    img: personPhoto,
                }
            }));
            setPersonFavorite(true);      
        }
    }

    return (
        <>
            <div className={styles.container}>
                <img className={styles.photo} src={personPhoto} alt={personName}/>
                <img 
                    className={styles.favorite}
                    onClick={dispatchFavoritePeople} 
                    src={personFavorite ? iconFavoriteFill : iconFavorite} 
                    alt='add to fav'
                />
            </div>
        </>
    )
};

PersonPhoto.propTypes = {
    personPhoto: PropTypes.string,
    personName: PropTypes.string,
    personId: PropTypes.string,
    personFavorite: PropTypes.bool,
    setPersonFavorite: PropTypes.func,
}

export default PersonPhoto;