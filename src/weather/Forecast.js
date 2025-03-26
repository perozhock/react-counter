import { useCallback, useEffect, useState } from 'react'
import { timeConvert } from '../constants/time';
import axios from 'axios'

export const Forecast = ({ city }) => {

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


    const roundT = (cells) => (typeof cells === 'number' ? cells.toFixed() : '-');

    useEffect(() => {
        if (city) {
            getData();
        }
    }, [city, getData]);

    console.log(data)

    return (
        <div className='forecast-container'>
            <h2 className='forecast-title'>Прогноз погоды</h2>
            {isLoading ? (
                <p className='forecast-loading'>Загрузка...</p>
            ) : error ? (
                <p className="forecast-error">{error}</p>
            ) : (
                data && (
                    <div className='forecast-details'>
                        <div>Местоположение: <p>{data.name || '-'}</p></div>
                        <div>Температура:<p className='forecast-temp'> {roundT(data?.main?.temp)} °C </p></div>
                        <div>Ощущается как: <p>{roundT(data?.main?.feels_like)} °C</p></div>
                        <div>Погода: <p>{data?.weather?.[0]?.main || '-'}<img
                            alt={data?.weather?.[0]?.description || 'Weather icon'}
                            src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`}
                            title={data?.weather?.[0]?.description || 'Weather'}
                        /></p></div>
                        <div>
                            Рассвет: <p>{timeConvert(data?.sys?.sunrise, data?.timezone)}</p>
                        </div>
                        <div>
                            Закат: <p>{timeConvert(data?.sys?.sunset, data?.timezone)}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );

}