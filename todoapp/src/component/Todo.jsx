import React, {useState} from 'react';
import {GrFormClose, GrFormEdit, GrFormCheckmark} from  "react-icons/gr";
import { useTodoLayerValue } from '../context/TodoContext' ;
import clsx from "clsx";

const Todo = ({todo}) => {
  const [{}, dispatch] = useTodoLayerValue();
  const [editable, setEditable] = useState(false);
  const [content,setContent] = useState(todo.content);


  const removeTodo = (todoId) => {
    dispatch({
      type :"REMOVE_TODO",
      payload: todoId,
    });
  };

  const completeTodo = (todoId) => {
    dispatch({
      type :"COMPLETE_TODO",
      payload: todoId,
    });
  };

  const updateTodo = ({todoId, newValue}) => {
    dispatch({
      type :"UPDATE_TODO",
      payload: {
        todoId,
        newValue,
      },
    });
  };
  const todoStyle = clsx({
    ["todo-row"]:true,
    ["completed"]:todo.isCompleted,
  });

  return (
    <div className={todoStyle}>
      <div onClick={() => editable ? '' : completeTodo(todo.id)}>
        
        {editable ? (
          <input type='text' 
          value={content} 
          onChange={event => setContent(event.target.value)} 
          className = "todo-input-edit"
          />) :          
          (
            todo.content  
          )          
        }
        
      </div>

      <div className='todo-icons' style={{}}>
        <GrFormClose 
          className='todo-icons' 
          onClick = {() => removeTodo(todo.id)}
        />
        {
          editable ? (<GrFormCheckmark
            className = 'todo-icons' 
            onClick = {()=>{
            updateTodo({
              todoId: todo.id,
              newValue: content
            });
           

          setContent('');
          setEditable(false);
          }} 
          />) :

          (<GrFormEdit 
            onClick = {() => setEditable(true)} 
            className='todo-icons' />  )    
        }
        </div>
    </div>
  );
};

export default Todo;