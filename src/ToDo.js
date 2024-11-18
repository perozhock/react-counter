import './styles/ToDo.css'
import { useState } from "react"

const data = [
    {
        id: 1,
        title: "-",
        isComlete: false    
    }
]

const InputForm = ({onAdd}) => {
    const [name, setName] = useState("");
    function handleKey(ev) {
        if (ev.key === 'Enter' && name.trim() !== '') {
            onAdd(name);
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
        />
        </div>
        )
}

const TodoI = ({item, onli}) => {
    return (
    <div>
    <button key={item.id} onClick={onli}
    className={item.isComlete ? "item-text strike" : "item-text"}>
        {item.title} {item.id}
    </button>
    </div>
    )
}

const TodoList = () => {
    const [todo, setTodo] = useState(data)
    
    let id_n = todo[0].id;

    function addTask(title) {
        setTodo([{id:id_n + 1, title, isComlete:false}, ...todo])
    }

    function toogleTask(id) {
        setTodo([
            ...todo.map((todo) => 
        todo.id === id ? {...todo, isComlete: !todo.isComlete} : {...todo})
        ])
    }

    return (
        <div className="todo">
            <div className="todo-name">Список дел</div>
            <InputForm onAdd={addTask} />
            {todo.map(item => (<TodoI key={item.id} item={item} onli={() => toogleTask(item.id)} />))}
        </div>
    )
}

export default TodoList;