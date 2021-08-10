import React, {useState} from 'react';

const Counter = () => {
    let [count, setCount] = useState(0)

    function increment() {
        setCount(++count)
    }

    function decrement() {
        if (count === 0) {
            count = 0
            return
        }
        setCount(--count)
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Увеличить</button>
            <button onClick={decrement}>Уменьшить</button>
        </div>
    );
};

export default Counter;