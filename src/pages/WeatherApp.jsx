import { useEffect, useState } from 'react';
import { CityDetails } from '../cmps/CityDetails';
import { ModalMsg } from '../cmps/ModalMsg';
import { useDispatch, useSelector } from 'react-redux'
import { getCity, setMsg } from '../store/actions/weatherAction';
import { SearchModal } from '../cmps/SearchModal';
import TextField from '@material-ui/core/TextField';
import { weatherService } from '../services/weatherService';

function useDebounce(val, delay) {
    const [debounceVal, setDebounceVal] = useState(val)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceVal(val)
        }, delay);
        return () => {
            clearTimeout(handler)
        }
    }, [val])
    return debounceVal

}

export function WeatherApp() {
    const { msg } = useSelector(state => state.weatherReducer)
    const [city, setCity] = useState({ name: '' })
    const [searchModal, setSearchModal] = useState(false)
    const [tenCitys, setTenCitys] = useState(null)
    const [modalMsg, setModalMsg] = useState(false)

    const dispatch = useDispatch()
    const debounceSearchTrm = useDebounce(city.name, 700)

    useEffect(() => {
        if (!city.name && searchModal) {
            toggleSearchModal()
        }
    }, [city.name])

    useEffect(() => {
        if (debounceSearchTrm) {
            onCallApiOptions()
        }
    }, [debounceSearchTrm])

    useEffect(() => {
        if (tenCitys) setSearchModal(true)

    }, [tenCitys])

    useEffect(() => {
        setModalMsg(true)
        setTimeout(() => {
            setModalMsg(false)
            dispatch(setMsg(null))

        }, 1700);
    }, [msg])

    const onCallApiOptions = async () => {
        const data = await weatherService.callApiOptions(debounceSearchTrm)
        if (data) {
            const newData = [...data]
            setTenCitys(newData)
        }
    }

    const handleChange = (ev) => {
        const { value } = ev.target
        const copyName = { ...city }
        copyName.name = value
        setCity(copyName)
    }

    const onSubmit = (ev) => {
        ev.preventDefault()
        onGetCity()
        setCity({ name: '' })

    }

    const onGetCity = async () => {
        dispatch(getCity(city))

    }

    const toggleSearchModal = () => {
        setSearchModal(!searchModal)
    }

    const checkValue = () => {
        if (city.name) {
            toggleSearchModal()
        }
    }

    const onSelectCity = (city) => {
        dispatch(getCity(city.LocalizedName))
        setSearchModal(false)
    }

    return (
        <section className="weather-app  flex">

            <main className="input-container">
                <form onSubmit={(ev) => onSubmit(ev)}>
                    <TextField id="outlined-basic" type="search"
                        placeholder="Search"
                        autoComplete="off"
                        value={city.name}
                        onChange={handleChange}
                        onClick={() => checkValue()} label="Search" variant="outlined" />
                    <button type="submit" hidden>
                    </button>
                </form>
                {searchModal && <SearchModal onSelectCity={onSelectCity} tenCitys={tenCitys} />}
            </main>
            <CityDetails />
            {searchModal && <div className="screen" onClick={() => toggleSearchModal()}></div>}
            <ModalMsg msgOpen={modalMsg} />
        </section>
    )
}
