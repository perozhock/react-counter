import './styles/ToDo.css'
import { useState } from "react"

const InputForm = ({onAdd}) => {
    const [name, setName] = useState("");

    function handleKey(ev) {
        if (ev.key === 'Enter' && name.trim() !== '') {
            onAdd(name.trim());
            setName('');
        }
    }

    return (
        <div className="input" onKeyDown={handleKey}>
            <input 
                type="text" 
                placeholder="add todo" 
                onChange={ev => setName(ev.target.value)}
                value={name}
                onKeyDown={handleKey}
            />
        </div>
    )
}

const TodoI = ({item, onToggle}) => {
    return (
        <div className='todo-item'>
            <button 
                className={`item-text ${item.isComplete ? 'strike' : ''}`}
                onClick={() => onToggle(item.id)}
            > {item.title}
            </button>
        </div>
    )
}

const TodoList = () => {
    const [todo, setTodo] = useState([]);
    const [idCounter, setIdCounter] = useState(1);

    const addTask = (title) => {
        setTodo([{ id: idCounter, title, isComplete: false}, ...todo]);
        setIdCounter((prevId) => prevId + 1);
    }

    const toggleTask = (id) => {
        setTodo((prevTodo) =>
            prevTodo.map((task) =>
                task.id === id ? {...task, isComplete: !task.isComplete } : task
            )
        );
    };

    return (
        <div className="todo">
            <div className="todo-name">Список дел</div>
            <InputForm onAdd={addTask} />
            {todo.map((item) => (
                <TodoI key={item.id} item={item} onToggle={toggleTask} />
            ))}
        </div>
    )
}

export default TodoList;