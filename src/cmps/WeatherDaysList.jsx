import React from 'react'
import { WeatherDaysPreview } from './WeatherDaysPreview';

export function WeatherDaysList({ days }) {

    return (
        <div className="weather-list flex">
            {days?.map((day, idx) => {
                return (
                    <WeatherDaysPreview
                        key={idx}
                        day={day}
                    />)
            })}

        </div>
    )
}
