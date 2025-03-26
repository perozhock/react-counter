export const ThreeHourForecast = ({ days, timezone }) => {
    const timeConvert = (time) => {
        if (typeof time === 'number') {
            const localTime = new Date((time + timezone) * 1000); // Применяем часовой пояс
            const formattedDate = localTime.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
            });
            const formattedTime = localTime.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
            });
            return `${formattedDate} ${formattedTime}`;
        }
        return '-';
    };

    return (
        <li className="list__item">
            <img
                alt={days?.weather?.[0]?.description || 'Weather icon'}
                src={`https://openweathermap.org/img/wn/${days?.weather?.[0]?.icon}@2x.png`}
                title={days?.weather?.[0]?.description || 'Weather'}
            />
            <div>{days?.main?.temp?.toFixed() || '-'} °C</div>
            <div>{days?.weather?.[0]?.main || '-'}</div>
            <div>{days?.pop ? Math.round(days.pop * 100) : 0}%</div>
            <div>{timeConvert(days?.dt)}</div>
        </li>
    );
};
