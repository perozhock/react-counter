import React, { useState, useEffect, useCallback } from 'react';
import { ThreeHourForecast } from './ThreeHourForecast';
import axios from 'axios';

export const DayForecast = ({ city }) => {
    const apikey = 'b6135fa9cdeb231961b63c035e2d8911';

    const [daysData, setDaysData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getDaysData = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}`
            );
            setDaysData(response.data);
        } catch (err) {
            console.error('Ошибка загрузки данных:', err);
            setError('Не удалось загрузить прогноз. Попробуйте позже.');
        } finally {
            setIsLoading(false);
        }
    }, [city]);

    useEffect(() => {
        if (city) {
            getDaysData();
        }
    }, [city, getDaysData]);

    return (
        <div className="weather__block">
            <h2>Прогноз на день</h2>
            {isLoading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <ul className="list">
                    {daysData.list
                        ? daysData.list.map((day) => (
                            <ThreeHourForecast
                                key={day.dt}
                                days={day}
                                timezone={daysData.city.timezone} />
                        ))
                        : <p>Данные отсутствуют</p>}
                </ul>
            )}
        </div>
    );
};
