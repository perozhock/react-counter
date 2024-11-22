import { type } from '@testing-library/user-event/dist/type';
import './styles/CountdownTimer.css'
import { useEffect, useState } from "react";

const CountdownTimer = ({ initialSeconds = 40 }) => {
    const [remTime, setRemTime] = useState(initialSeconds);
    const [isRun, setIsRun] = useState(false);

    useEffect(() => {
        if (isRun) {
            const id = setInterval(() => {
                setRemTime((prev) => {
                    if (prev <= 1) {
                        setIsRun(false);
                        clearInterval(id);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(id);
        }
    }, [isRun]);

    const handleInputChange = (value, type) => {
        if (!/^\d+$/.test(value)) return;
        const seconds = type === 'min' ? value * 60 + remTime % 60 : Math.floor(remTime / 60) * 60 + Number(value);
        setRemTime(seconds);
    }

    const resetTimer = () => {
        setIsRun(false);
        setRemTime(initialSeconds);
    }

    const formatTime = (time) => time.toString().padStart(2, '0');
    const minutes = Math.floor(remTime / 60);
    const seconds = remTime % 60;

    return (
        <div className="countdown">
            <div className="countdown-name">Таймер</div>
            <div className="countdown__input">
                <input 
                    className="inp" 
                    value={formatTime(minutes)}
                    onChange={ev => handleInputChange(ev.target.value, 'min')}
                />
                <span>:</span>
                <input 
                    className="inp" 
                    value={formatTime(seconds)}
                    onChange={ev => handleInputChange(ev.target.value, 'sec')}
                />
            </div>
            <div className='countdown__controls'>
                {isRun ? (
                    <button onClick={() => {setIsRun(false);}}>Stop</button>
                ) : (
                    <button onClick={() => {setIsRun(true)}}>Start</button>
                )}
            <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    )
}

export default CountdownTimer;