import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FavoritePreview } from '../cmps/FavoritePreview';
import { useHistory } from 'react-router';
import { getCity, setFavorites } from '../store/actions/weatherAction';
import { storageService } from '../services/storageService';

export function Favorites() {
  const { favorites, activeCity, isLight } = useSelector(
    (state) => state.weatherReducer
  );
  const [list, setList] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!favorites?.length) {
      const list = storageService.loadFromStorage('favorites');
      if (list) {
        dispatch(setFavorites(list));
      } else {
        setList(list);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openFavorite = (favorite) => {
    dispatch(getCity(favorite.name));
    history.push('/');
  };

  if (!favorites?.length && !list?.length)
    return (
      <div
        className={`${
          isLight ? 'light' : ('dark', 'bgcDark')
        } flex justify-center `}
      >
        <h1>let's save favorites our cities</h1>
      </div>
    );
  return (
    <div className='favorite-container flex'>
      {(favorites || list).map((favorite) => {
        return (
          <div key={favorite.key}>
            <FavoritePreview
              openFavorite={openFavorite}
              favorite={favorite}
              activeCity={activeCity}
            />
          </div>
        );
      })}
    </div>
  );
}
