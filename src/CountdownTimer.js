import './styles/CountdownTimer.css'
import { useEffect, useState } from "react";

const defaultRemTime = {
    sec: 5,
    min: 1,
    hrs: 0,
    days: 0,
}

const CountdownTimer = () => {
    const [remTime, setRemTime] = useState(0);
    const [isRun, setIsRun] = useState(false);

    useEffect(() => {
        if (isRun) {
            const id = window.setInterval(() => {
            if (remTime > 0) setRemTime((prev) => (prev - 1));
            }, 1000);
            return () => window.clearInterval(id);
        }
        return undefined;
    }, [isRun, remTime]);

    const mn = Math.floor(remTime / 60);
    const sc = remTime % 60;

    function resetTime() {
        setIsRun(false);
        setRemTime(defaultRemTime.sec);
    }

    return (
        <div className="countdown">
            <div className="countdown-name">Таймер</div>
            <div className="countdown__input">
                <input className="inp" value={mn}
                onChange={ev => setRemTime(ev.target.value*60)}></input>
                <span>:</span>
                <input className="inp" value={sc}
                onChange={ev => setRemTime(ev.target.value)}></input>
            </div>
            <div>
                {isRun 
                ? (
                    <button onClick={() => {setIsRun(false);}}>Stop</button>
                )
                : (
                    <button onClick={() => {setIsRun(true)}}>Start</button>
                )
            }
            <button onClick={resetTime}>Reset</button>
            </div>
        </div>
    )
}

export default CountdownTimer;