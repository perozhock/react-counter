import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const Forecast = ({ city }) => {

    const apikey = 'b6135fa9cdeb231961b63c035e2d8911';

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getData = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
            );
            setData(response.data);
        } catch (err) {
            console.error('Ошибка загрузки данных:', err);
            setError('Не удалось загрузить данные. Попробуйте позже.');
        } finally {
            setIsLoading(false);
        }
    }, [city])

    const timeConv = (time, timezone) => {
        if (typeof time == 'number') {
            const localTime = new Date((time + timezone) * 1000);
            return localTime.toISOString().substring(11, 5);
        }
        else return '-';
    }

    const roundT = (cels) => (typeof cels === 'number' ? cels.toFixed() : '-');

    useEffect(() => {
        if (city) {
            getData();
        }
    }, [city, getData]);

    console.log(data)

    return (
        <div className='forecast-container'>
            <h2>Прогноз погоды</h2>
            {isLoading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                data && (
                    <div>
                        <p>Местоположение: {data.name || '-'}</p>
                        <p>Температура: {roundT(data?.main?.temp)} °C</p>
                        <p>Ощущается как: {roundT(data?.main?.feels_like)} °C</p>
                        <p>Погода: {data?.weather?.[0]?.main || '-'}</p>
                        <p>
                            Рассвет: {timeConv(data?.sys?.sunrise, data?.timezone)}
                        </p>
                        <p>
                            Закат: {timeConv(data?.sys?.sunset, data?.timezone)}
                        </p>
                    </div>
                )
            )}
        </div>
    );

}

export default Forecast