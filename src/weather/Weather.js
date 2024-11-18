import '../styles/Weather.css'
import SearchBar from './SearchBar'
import Forecast from './Forecast'
import DayForecast from './DayForecast'
import { useState } from 'react'

const Weather = () => {

    const [city, setCity] = useState('moscow')

    return (
        <div className="weather">
            <div className="weather-name">Weather</div>
            <SearchBar city={setCity} />
            <Forecast city={city} />
            <DayForecast city={city} />
        </div>
    )
}

export default Weather;