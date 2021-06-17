import { weatherService } from '../../services/weatherService.js'


export function getCity(info = 'Tel Aviv') {
    return async dispatch => {
        try {
            const city = await weatherService.getCityKey(info)
            dispatch({ type: 'SET_ACTIVE_CITY', city })
            dispatch(setMsg('Select city successfully'))
        } catch (err) {
            dispatch(setMsg('Set city unsuccessfully'))

        }
    }
}

export function setCity(info) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_ACTIVE_CITY', info })
        } catch (err) {
            dispatch(setMsg('Set to favorite unsuccessfully'))

        }
    }
}

export function setFavorite(cityWeather) {

    return async dispatch => {
        try {
            const isFavorite = weatherService.chackFavorite(cityWeather)
            console.log('isFavorite is:', isFavorite);
            if (!isFavorite) {
                const favoritesList = weatherService.saveWeatherCityToFavorites(cityWeather)
                dispatch({ type: 'SET_FAVORITES', favoritesList })
                dispatch(setMsg('Set favorite successfully'))
            }
            else {
                dispatch({ type: 'SET_FAVORITES', isFavorite })
            }
        } catch (err) {
            dispatch(setMsg('Set favorite unsuccessfully'))

        }
    }
}

export function setFavorites(list) {
    return async dispatch => {

        try {
            dispatch({ type: 'SET_FAVORITES', list })

        } catch (err) {
            dispatch(setMsg('Set favorites unsuccessfully'))

        }
    }
}

export function setMsg(msg) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_MSG', msg })
        } catch (err) {
            dispatch(setMsg('Set msg unsuccessfully'))

        }
    }
}

export function changeMode(boolean) {
    return dispatch => {
        try {
            dispatch({ type: 'CHANGE_COLORS', boolean })
            dispatch({ type: 'SET_MSG', msg: `${boolean ? 'Light Mode' : 'Dark Mode'}` })

        } catch (err) {
            dispatch(setMsg('Change mode unsuccessfully'))


        }
    }
}
