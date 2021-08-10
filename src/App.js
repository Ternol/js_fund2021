import React, {useState} from "react";

function App() {
    const [likes, setLikes] = useState(0);
    const [value, setValue] = useState('Текст инпута');
    function increment() {
        setLikes(likes + 1)
    }

    function decrement() {
        if (likes === 0) {
            setLikes(0)
            return
        }
        setLikes(likes - 1)
    }

    return (
        <div>
            <h1>{likes}</h1>
            <button onClick={increment}>Увеличить</button>
            <button onClick={decrement}>Уменьшить</button>
            <div><input type="text"
                        value={value}
                        onChange={event => setValue(event.target.value)}/>
            </div>

        </div>
    );
}

export default App;
