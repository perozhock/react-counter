import axios from 'axios'
import { useState } from 'react'

const Weather = () => {

    const apikey = 'b6135fa9cdeb231961b63c035e2d8911';

    const [data, setData] = useState();
    const [daysData, setDaysData] = useState([])
    const [location, setLocation] = useState([])
    const [city, setCity] = useState('moscow')
    const [isVisible, setIsVisible] = useState(true)

    const SearchBar = ({city}) => {
        const [value, setValue] = useState("")

        const urlL = `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=10&appid=${apikey}`

        const getLocation = () => {
            axios.get(urlL).then((response) => {
                setLocation(response.data)
                console.log(response.data)
            })
        }

        const handleKey = (ev) => {
            if (ev.key === 'Enter') {
                getLocation()
                setValue('')
            }
            return;
        }

        const logg = (e) => {
            console.log(e.target.firstChild.data)
            city(e.target.firstChild.data)
            // setIsVisible(isVisible => !isVisible)
            setLocation('')
        }

        const checkVisible = () => {
            console.log(isVisible)
        }

        const inputClickHandler = () => {
            setIsVisible(true)
        }

        return (
            <div>
                <div>
                <input onChange={(ev) => setValue(ev.target.value)}
                        onKeyUp={handleKey} value={value}
                        onFocus={inputClickHandler}></input>
                    <button onClick={checkVisible}>FF</button>
                </div>  
            <ul>
                {isVisible && location
                ? location.map(loc => (<li key={loc.lat} onClick={logg}>
                    {loc.local_names ? loc.local_names?.en : loc.name}{" "}  
                    {loc.country}{" "}
                    {loc.state}</li>))
                : null}
            </ul>
            </div>
        )
    }

    const Forecast = () => {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`

        const getData = () => {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
        }

        const timeConv = (time) => {
            if (typeof time == 'number') {
                const timez = data.timezone / 3600 - 3;
                const a = new Date(time * 1000);
                const h = (a.getHours() + timez) < 0 ? (a.getHours() + timez) + 24 : (a.getHours() + timez);
                const m = a.getMinutes();
                return (h < 10 ? ("0" + h) : h) + ":" + (m < 10 ? ("0" + m) : m);
            }
            else return time;
        }
    
        const roundT = (cels) => {
            if (typeof cels == 'number') {
                return cels.toFixed();
            }
            else return cels;
        }

        return (
            <div>
                <div>Forecast</div>
                <div>Location: {data ? data.name : "-"}</div>
                <button onClick={getData}>Give me weather</button>
                <div>{data?.main?.temp ? roundT(data?.main?.temp) : "-"} °C</div>
                <div>Feels like: {data?.main?.feels_like ? roundT(data?.main?.feels_like) : "-"} °C</div>
                <div>{data?.weather ? <div>{data?.weather[0].main}</div> : "-"}</div>
                <div>
                    <div>Рассвет: {timeConv(data?.sys?.sunrise)}</div>
                    <div>Закат: {timeConv(data?.sys?.sunset)}</div>
                </div>
            </div>
        )

    }

    const DayForecast = () => {

        const urlDay = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}`

        const getDaysData = () => {
            axios.get(urlDay).then((resp) => {
                setDaysData(resp.data)
                console.log(resp.data)
            })
        }

        return (
            <div className='weather__block'>
                <div>Day Forecast</div>
                <div><button onClick={getDaysData}>Give me days</button></div>
                <ul className='list'>
                    {daysData.list 
                    ? daysData.list.map(days => (<ThreeHourForecast key={days.dt} days={days} />))
                    : null}
                </ul>
            </div>
        )
    }

    const ThreeHourForecast = ( {days} ) => {

        const timeConv = (time) => {
            if (typeof time == 'number') {
                const timez = daysData.city.timezone / 3600 - 3;
                const a = new Date(time * 1000);
                const d = a.getDate()
                const mnth = a.getMonth()
                const h = (a.getHours() + timez) < 0 ? (a.getHours() + timez) + 24 : (a.getHours() + timez);
                const m = a.getMinutes();
                const daysmonth = d + "." + "0" + mnth

                return (daysmonth + " " + (h < 10 ? ("0" + h) : h) + ":" + (m < 10 ? ("0" + m) : m));
            }
            else return time;
        }

        return (
            <div className='list__item'>
                <li className='list__iitem'>
                    <img alt={days.weather[0].description} 
                         src={`https://openweathermap.org/img/wn/${days.weather[0].icon}@2x.png`}
                         title={days.weather[0].description} />
                    <div>{days.main.temp.toFixed()} °C{" "}</div>
                    <div>{days.weather[0].main}{" "}</div>
                    <div>{days.pop*100}{"% "}</div>
                    {timeConv(days.dt)}{" "}
                    
                </li>
            </div>
        )
    }

    return (
        <div className="weather">
            <div className="weather-name">Weather</div>
            <SearchBar city={setCity} />
            <Forecast />
            <DayForecast />
        </div>
    )
}

export default Weather;