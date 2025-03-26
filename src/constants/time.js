export const timeConvert = (time, timezone) => {
    if (typeof time === 'number') {
        const localTime = new Date((time + timezone) * 1000);
        const hours = localTime.getUTCHours().toString().padStart(2, '0');
        const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    } else {
        return '-';
    }
};