import React from 'react';

export const Todo = ({ todo, onTodoClicked, onRemoveTodo, onUpdateTodo}) => {
  let input;
  return (
    <div class="todo">
      <input type='checkbox'
        defaultChecked={ todo.completed }
        onClick={ onTodoClicked }
      />
      <input type="text"
        style={{
        textDecoration: todo.completed ? 'line-through' : 'none'
        }}
        defaultValue={ todo.text }
        ref={ node => input = node }
        onChange={ () => onUpdateTodo(todo, input.value) }
      />
      <button class="remove"
          onClick={ onRemoveTodo }
      >Remove</button>
    </div>
  );
}

export default Todo;