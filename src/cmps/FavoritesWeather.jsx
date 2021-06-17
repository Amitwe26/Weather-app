import React from 'react'

export function FavoritesWeather({ favorites }) {
    return (
        <div>
            {favorites.map(favorite => {
                return <div key={favorite.id}>
                    <h1>{favorite.Date}</h1>
                </div>
            })}
        </div>
    )
}
