import React, {useState, useEffect, useRef } from 'react';
import { useTodoLayerValue } from './context/TodoContext';
import TodoList from './component/Todolist';

import './App.css';

const App = () => {
  
    const [{todos}, dispatch] = useTodoLayerValue();
    const [content, setContent] = useState('');
    
    const inputRef = useRef(null);

    useEffect(() => {
      inputRef.current.focus();
    }, [])
    
    const handleSubmit = (event) => {
      //console.log(content);
      event.preventDefault();

      if(!content && content.length < 1) return;

      const newTodo = {
        id: Math.floor(Math.random() * 12356377),
        content,
        isCompleted: false,
      };

      dispatch({
          type: 'ADD_TODO',
          payload:  newTodo,
      });

        setContent('');
    };
    //console.log(todos);
    return(
      <div className='container'>
        <form onSubmit={handleSubmit} className="todo-form">
          <input className='todo-input' type = "text" placeholder="Write something..." onChange = {(event) => setContent(event.target.value)}
          value = {content} 
          ref = {inputRef}
          />

          <button className='todo-button'>
            Click to add something!
          </button>
        </form>

        {/*Todo list*/}
        <TodoList todos = {todos}/>
      </div>
    )
};

export default App;