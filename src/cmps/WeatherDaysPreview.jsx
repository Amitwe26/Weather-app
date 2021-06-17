import React, { useEffect, useState } from 'react'
import { imgService } from '../services/imgService'
import { useSelector } from 'react-redux';
export function WeatherDaysPreview({ day }) {
    const { isLight } = useSelector(state => state.weatherReducer)
    const [temperature, setTemperature] = useState(true)
    const [img, setImg] = useState(null)


    useEffect(() => {
        onSetImg()
    }, [])

    function changetime() {
        const newDate = new Date(day.Date)
        const localDate = newDate.toLocaleDateString()
        return localDate
    }

    const getCelsius = () => {
        const c = (day.Temperature.Maximum.Value - 32) / 1.8
        return Number.parseFloat(c).toFixed()
    }
    const getDays = () => {
        const arrayDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const index = new Date(day.Date).getDay()
        return arrayDays[index]
    }
    const onSetImg = () => {
        const numIcontDay = day.Day.Icon
        const img = imgService.getImg(numIcontDay)
        setImg(img)
    }
    const toggleCelsius = () => {
        setTemperature(!temperature)
    }
    return (
        <div className="day-preview flex col align-center">
            <div className="top">
                <h1 className={`day ${isLight ? 'light' : 'dark'}`}>{getDays()}</h1>
                <span className={`celsius ${isLight ? 'light' : 'dark'}`}>{changetime()}</span>

                <p className={`celsius ${isLight ? 'light' : 'dark'}`} onClick={() => toggleCelsius()}>{
                    temperature ?
                        getCelsius() + '°C' :
                        day.Temperature.Maximum.Value + 'F'}</p>
            </div>
            <img src={img} alt="img" />
        </div>
    )
}
