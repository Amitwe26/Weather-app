import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCity, setFavorite } from '../store/actions/weatherAction';
import { WeatherDaysList } from './WeatherDaysList';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { imgService } from '../services/imgService';
import { weatherService } from '../services/weatherService';
import { Map } from '../cmps/Map';
import { storageService } from '../services/storageService';

export function CityDetails() {
  const { activeCity, isLight } = useSelector((state) => state.weatherReducer);
  const [temperature, setTemperature] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getLocationUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeCity) {
      checkImg();
      checkFavorite();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCity]);
  const getLocationUser = async () => {
    if (!activeCity) {
      try {
        const userCity = await weatherService.getLocation();
        dispatch(getCity(userCity));
      } catch (err) {
        dispatch(getCity());
      }
    }
  };

  const getCelsius = () => {
    if (activeCity.days) {
      const temperature = activeCity?.days[0].Temperature.Maximum.Value;
      const c = (temperature - 32) / 1.8;
      return Number.parseFloat(c).toFixed();
    }
  };

  const onSetFavorite = () => {
    if (!isFavorite) {
      setIsFavorite(true);
      dispatch(setFavorite(activeCity));
    }
    if (isFavorite) {
      setIsFavorite(false);
      dispatch(setFavorite(activeCity));
    }
  };

  const toggleCelsius = () => {
    setTemperature(!temperature);
  };

  const checkImg = () => {
    const time = new Date().getHours();
    if (!activeCity) return;
    if ((time >= 17 && time <= 23) || time === 0 || (time === 1 && time <= 5)) {
      const numIcontNight = activeCity?.days[0].Night.Icon;
      const img = imgService.getImg(numIcontNight);
      setImg(img);
    } else {
      const numIcontDay = activeCity?.days[0].Day.Icon;
      const img = imgService.getImg(numIcontDay);
      setImg(img);
    }
  };

  const checkFavorite = () => {
    if (activeCity) {
      const list = storageService.loadFromStorage('favorites');
      const isFavorite = list?.find(
        (favorite) => favorite.key === activeCity.key
      );
      if (isFavorite?.favorite) setIsFavorite(true);
      else setIsFavorite(false);
    }
  };

  if (!activeCity) return <div>Loading...</div>;
  return (
    <div
      className={`city-details flex column ${isLight ? 'bgcLight' : 'bgcDark'}`}
    >
      <div className='flex space-between'>
        <div className='left-top flex'>
          <Map className='map' activeCity={activeCity} />
          <div className='flex column'>
            <span className={`name ${isLight ? 'light' : 'dark'}`}>
              {activeCity.name}
            </span>
            <span
              className={`celsius ${isLight ? 'light' : 'dark'}`}
              onClick={() => toggleCelsius()}
            >
              {temperature
                ? getCelsius() + '°C'
                : activeCity?.days[0].Temperature.Maximum.Value + 'F'}
            </span>
            <span className={` ${isLight ? 'light' : 'dark'}`}>
              {activeCity.TimeZone}
            </span>
          </div>
        </div>
        <div className='right-top flex'>
          <span
            className={`btn-favorite ${isFavorite ? 'favorite' : ''}`}
            onClick={() => onSetFavorite()}
          >
            <BookmarkBorderIcon />
          </span>
        </div>
      </div>
      <div className='day-title flex column '>
        <img className='img' src={img} alt='img' />

        <h2 className={`phrase ${isLight ? 'light' : 'dark'}`}>
          {activeCity?.days[0].Day.IconPhrase}
        </h2>
      </div>

      <WeatherDaysList days={activeCity.days} />
    </div>
  );
}
