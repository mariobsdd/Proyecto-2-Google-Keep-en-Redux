import React from 'react';

//componente para filtrar entre notas y todos
export const AddTodo = ({ onAddTodo, children }) => {
  let input;

  return (
    <div class="new-todo">
      <input type="text" 
        ref={ node => input = node } 
        placeholder="Nuevo To-Do"
        onKeyDown={
          (event) => {
            if(event.keyCode === 13){
              onAddTodo(input.value);
              input.value = "";
            }
          }
        } 
      />
    </div>
  );
}
export default AddTodo;