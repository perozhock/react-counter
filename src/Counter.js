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
            <div>Счетчик</div>
        <h1>Число: {count}</h1>
        <button onClick={plus}>+</button>
        <button onClick={minus}>-</button>
        </div>
      )

}

export default Counter