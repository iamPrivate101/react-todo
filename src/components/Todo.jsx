import { useEffect, useRef, useState } from 'react'
import './CSS/Todo.css'
import TodoItems from './TodoItems';

let count = 0;
const Todo = () => {

    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);

    const add = () => {
        setTodos([...todos,{no:count++, text:inputRef.current.value, display:""}]);
        inputRef.current.value = "";
        localStorage.setItem("todos_count", count);
    }

    //retrive the previous data from the local storage so that the data deleted while refresh can be accessed again
    useEffect(()=>{
        setTodos(JSON.parse(localStorage.getItem("todos"))); //data is retrive in string so parse it to JSON
        count = localStorage.getItem("todos_count");
    },[]);

    useEffect(()=>{
        console.log(todos);
        setTimeout(()=>{
            //saving the data in local storage, convert to string before saving , when the page is reloaded its gets deleted
            localStorage.setItem("todos",JSON.stringify(todos));
        },100);
    },[todos]);

    

  return (
    <div className='todo'>
        <div className="todo-header">To-Do List</div>
        <div className="todo-add">
            <input type="text" ref={inputRef} className="todo-input" placeholder='Add Your Task' />
            <div onClick={()=>{add()}} className="todo-add-btn">Add</div>
        </div>
        <div className="todo-list">
            {todos.map((item,index) => {
                return <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text} ></TodoItems>
            })}
        </div>
    </div>
  )
}

export default Todo
