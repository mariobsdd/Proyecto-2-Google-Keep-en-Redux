import React from 'react';

//componente para agregar nueva nota o todos (menu)
export const AddItem = ({ onAddTodoList, onAddNote }) => {
  let input;
  return (
    <div>
      <h2 class="title">Bienvenido a Chapin Keep</h2>
      <div class="new-element">
        <input 
          type="text" 
          placeholder={ 'Escribe una nota' }
          ref={ node => input = node } 
          onKeyDown={
            (event) => {
              if(event.keyCode === 13){
                onAddNote(input.value);
                input.value = "";
              }else if(event.keyCode === 9){
                onAddTodoList(input.value);
                input.value="";
              }
            }
          }
        />
      </div>
      <div class="sub-container">
        <button class="btn"
          onClick={
            () => { 
              onAddNote(input.value);
              input.value = "";
            }
          }
        >Nueva Nota</button>
        <button
          class="btn"
          onClick={
            () => { 
              onAddTodoList();
            }
          }
        >Nuevo To-Do</button>
        <button class="btn" onClick={() => {store.dispatch(ActionCreators.undo());}}>Un-do</button>
        <button class="btn" onClick={() => {store.dispatch(ActionCreators.redo());}}>Re-do</button>
      </div>
    </div>
  );
}

export default AddItem;