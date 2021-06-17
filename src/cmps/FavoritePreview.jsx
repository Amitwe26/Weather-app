import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { imgService } from '../services/imgService';

export function FavoritePreview({ favorite, activeCity, openFavorite }) {
    const { isLight } = useSelector(state => state.weatherReducer)
    const [img, setImg] = useState()

    useEffect(() => {
        checkImg()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkImg = () => {

        const time = new Date().getHours()
        if ((time >= 17 && time <= 23) || time === 0 || (time === 1 && time <= 5)) {
            const numIcontNight = favorite.days[0].Night.Icon
            const img = imgService.getImg(numIcontNight)
            setImg(img)
        } else {
            const numIcontNight = favorite.days[0].Day.Icon
            const img = imgService.getImg(numIcontNight)
            setImg(img)
        }
    }

    return (
        <div
            className={`favorite-preview ${isLight ? 'bgcLight' : 'bgcDark'}`}
            onClick={() => openFavorite(favorite)}
        >
            <h1 className={`${isLight ? 'light' : 'dark'}`}>{favorite.name}</h1>
            <p className={`${isLight ? 'light' : 'dark'}`}>{favorite.country}</p>
            <div className={`phrase-day ${isLight ? 'light' : 'dark'}`}>{favorite.phraseDay}</div>
            <img src={img} alt="img" />
        </div>
    )
}
