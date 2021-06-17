import React from 'react'
import { useSelector } from 'react-redux'

export function ModalMsg({ msgOpen }) {
    const { msg } = useSelector(state => state.weatherReducer)
    return (
        <div className={`modal-msg ${msgOpen ? 'open' : 'close'} `}>
            <span>{msg}</span>
        </div>
    )
}
