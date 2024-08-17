import { useState } from "react"

const Counter = () => {
    const [count, setCount] = useState(0);

    function plus() {
        setCount(count => count + 1);
    }
      
    function minus() {
        setCount(count => count - 1);
    }

      return (
        <div className="counter">
            <div className="counter__name" >Счетчик</div>
            <div className="counter__content">
                <h1>Число: {count}</h1>
            </div>
            <div className="counter__buttons">
                <button onClick={plus}>+</button>
                <button onClick={minus}>-</button>
            </div>
        </div>
      )

}

export default Counter