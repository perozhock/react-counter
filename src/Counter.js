import './styles/Counter.css';
import { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0);
    const [animate, setAnimate] = useState(false);

    const handleChange = (delta) => {
        setCount((prevCount) => {
            const newCount = prevCount + delta;
            setAnimate(true);
            setTimeout(() => setAnimate(false), 300);
            return newCount;
        });
    };

    const resetCounter = () => {
        setCount(0);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
    };

    return (
        <div className="counter">
            <h1 className="counter__name">Счётчик</h1>
            <div className="counter__content">
                <h2 className={`number ${animate ? 'animate' : ''}`}>Число: {count}</h2>
            </div>
            <div className="counter__buttons">
                <button onClick={() => handleChange(1)} aria-label="Увеличить">
                    +
                </button>
                <button
                    onClick={() => handleChange(-1)}
                    // disabled={count <= 0}
                    aria-label="Уменьшить"
                >
                    -
                </button>
                <button onClick={resetCounter} aria-label="Сбросить">
                    Сброс
                </button>
            </div>
        </div>
    );
};

export default Counter;
