import axios from 'axios';
import { storageService } from './storageService.js';
import { utilService } from './utilService.js';

const WEATHER_KEY = 'S7HgN9f5jGTGuiAAj8pUL6QwIrfwJlTH';
const KEY_WORD = 'WeatherDays';

export const weatherService = {
  queryDaysWeather,
  chackFavorite,
  getCityKey,
  saveWeatherCityToFavorites,
  callApiOptions,
  getLocation,
};

async function getCityKey(value) {
  const cityFromStorge = storageService.loadFromStorage(value);
  if (!cityFromStorge) {
    const res = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${WEATHER_KEY}&q=${value}`
    );
    const city = res.data[0];
    storageService.saveToStorage(res.data[0].EnglishName, city);
    const key = city.Key;
    const days = await queryDaysWeather(key);
    const obj = createObj(city, days);
    return obj;
  } else {
    const key = cityFromStorge.Key;
    const days = await queryDaysWeather(key);
    const obj = createObj(cityFromStorge, days);
    return obj;
  }
}

function createObj(city, days) {
  const obj = {
    name: city.EnglishName,
    country: city.Country.EnglishName,
    days: days,
    key: city.Key,
    phraseDay: days[0].Day.IconPhrase,
    phraseNight: days[0].Night.IconPhrase,
    favorite: false,
    geolocation: city.GeoPosition,
    TimeZone: city.TimeZone.Name,
  };
  return obj;
}

async function queryDaysWeather(keyCity) {
  const res = await axios.get(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${keyCity}?apikey=${WEATHER_KEY}`
  );
  const weathers = res.data.DailyForecasts;
  storageService.saveToStorage(KEY_WORD, weathers);
  return weathers;
}

function saveWeatherCityToFavorites(city) {
  const favorites = storageService.loadFromStorage('favorites');
  if (favorites) {
    const newFavorites = [...favorites];
    city.favorite = true;
    newFavorites.push(city);
    storageService.saveToStorage('favorites', newFavorites);
    return newFavorites;
  } else {
    const newFavorites = [];
    city.favorite = true;
    newFavorites.push(city);
    storageService.saveToStorage('favorites', newFavorites);
    return newFavorites;
  }
}

function chackFavorite(city) {
  const favorites = storageService.loadFromStorage('favorites');

  if (!favorites) return false;
  const favorite = favorites.find((favorite) => favorite.key === city.key);
  if (favorite) {
    const newList = favorites.filter((favorite) => favorite.key !== city.key);
    storageService.saveToStorage('favorites', newList);
    return newList;
  } else {
    return favorite;
  }
}

async function callApiOptions(debounceSearchTrm) {
  const res = await axios.get(
    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${WEATHER_KEY}&q=${debounceSearchTrm}`
  );
  const tenOptions = res.data;
  storageService.saveToStorage('ten option', tenOptions);
  return tenOptions;
}

async function getLocation() {
  const coords = await utilService.getUserLocation();
  if (!coords) return;
  const lat = coords.coords.latitude;
  const lon = coords.coords.longitude;
  try {
    const res = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${WEATHER_KEY}&q=${lat}%2C${lon}`
    );
    return res.data.EnglishName;
  } catch (err) {
    throw err;
  }
}
