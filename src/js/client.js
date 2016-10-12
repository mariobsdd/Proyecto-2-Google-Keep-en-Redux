//General
import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import v4 from 'uuid-v4';
import '../styles/style.scss';
//undo's - redo's
import undoable from 'redux-undo';
import {ActionCreators} from 'redux-undo';
//reductores
import { todos } from './reducers/todos';
import { items } from './reducers/items';
import { visibilityFilterItems } from './reducers/visibility';
import { setsearch } from './reducers/setsearch';
//componentes react
import ColoresKeep from './items/Colores.js';
//import AddItem from './items/AddItem.js';
import AddTodo from './items/AddTodo.js';
import FilterLink from './items/FilterLink.js';
import Titulo from './items/Titulo.js';
import Note from './items/Note.js';
import SearchItem from './items/SearchItem.js';
import Todo from './items/Todo.js';
//pruebas unitarias
//import deepFreeze from 'deep-freeze';
//import expect from 'expect';

//---------

const { Component } = React;


const todoApp = combineReducers({
  items,
  visibilityFilterItems,
  setsearch
});

const loadState = () => {
  try{
    let result = JSON.parse(localStorage.getItem('state'));
    return result ? {past: [], present: result, future: []} : undefined;
  }
  catch(err){
    return undefined;
  }
}

const saveState = (state) => {
  try{
    localStorage.setItem('state',JSON.stringify(state.present));
  }
  catch(err){

  }
}

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


const store = createStore(undoable(todoApp), loadState());

//componente para filtrar entre notas y todos
const GeneralFilter = ({ currentVisibilityFilter, onFilterClicked }) => (
  <div class="general-footer">
    Filtrar Por:
    <FilterLink
      visibilityFilter="SHOW_ALL_ITEMS"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Todos</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_NOTES"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Notas</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_TODOS"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>To-Do</FilterLink>
  </div>
);


//componente para buscar elementos dependiendo de si es nota o todo
const getSearchedItems = (items, setsearch) => {
  if ( typeof setsearch.search !== "undefined" )
    if ( setsearch.search !== "" )
      return items.filter(
        item => {
          if (typeof item.title !== "undefined")
              if (item.title.toUpperCase().includes(setsearch.search))
                return true;
          if (item.isNote){
            if (typeof item.text !== "undefined")
              if (item.text.toUpperCase().includes(setsearch.search))
                return true;
          }
          if (!item.isNote){
            let val = false;
            for(var i = 0; i < item.todolist.length; i++) {
              if (item.todolist[i].text.toUpperCase().includes(setsearch.search)) {
                  val = true;
              }
            }
            
            return val;
          }
        }
      );
  return items;
}

//componente para filtrar/eliminar items (notas y todos)
const getVisibleItems = (items, visibilityFilter, setsearch) => {
  items = getSearchedItems(items, setsearch);
  if(visibilityFilter === 'SHOW_ALL_ITEMS')
    return items.filter(t => !t.archived);

  if(visibilityFilter === 'SHOW_NOTES')
    return items.filter(t => t.isNote).filter(t => !t.archived);
  
  if(visibilityFilter === 'SHOW_TODOS')
    return items.filter(t => !t.isNote).filter(t => !t.archived);
}

const ItemList = ({ items, colors }) => (
  <div>
    {
      items.map(item => (
        <Item
          key={ item.id }
          item={ item }
          colors={ colors }
        />
        
      ))
    }
  </div>
);

const Item = ({ item, colors}) => {
  let value;
  switch(item.isNote) {
    case true:
      value =
        <Note
          note={ item }
          onUpdateNote={
            (itemId, text) => {
              store.dispatch({
                type: 'UPDATE_NOTE',
                payload: {
                  itemId,
                  text
                }
              });
            }
          }
        />
      break;
    default:
      value = <TodosApp
        todos={ item.todolist }
        visibilityFilter={ item.visibilityFilter }
        itemId={ item.id }
        />
      break;
  }
  return (
    <div
      style={{
      background: item.color
      }}
      class="element"
    >
      <Titulo
        item={ item }
        onUpdateTitle={
          (itemId, text) => {
            store.dispatch({
              type: 'UPDATE_TITLE',
              payload: {
                itemId,
                text
              }
            });
          }
        } 
      />
      <button
        class="archivate"
        onClick={ 
          () => {
            store.dispatch({
              type: 'ARCHIVE_ITEM',
              payload: {
                itemId: item.id
              }
            });
          } 
        }
      >X</button>
      { value }
      <div>
        <p class="inline-text">Creado: {item.create_date} </p>
      </div>
      <div>
        <p class="inline-text">Ult. vez modificado: {item.modified_date}</p>
      </div>
      <div class="colors">
        Color:
        {colors.map(color => (
          <button
            class="color"
            key={ colors.indexOf(color) }
            style={{ background: color }}
            onClick={
              () => {
                store.dispatch({
                  type: 'CHANGE_COLOR',
                  payload: {
                    itemId: item.id,
                    color
                  }
                })
              }
            }
            ></button>
          ))
        }
      </div>
    </div>
  );
}

const ItemsApp = ({ items, visibilityFilterItems, setsearch }) => (
  <div>
    <SearchItem
      setsearch={ setsearch }
      onSearchItem={
        (text) => {
          store.dispatch({
            type: 'SEARCH_ITEM',
            payload: {
              text
            }
          })
        }
      }
    />
    <div class="container">
      <AddItem
        onAddNote={
          (text) => {
            store.dispatch({
              type: 'ADD_NOTE',
              payload: {
                id: v4(),
                text,
                color: ColoresKeep[0]
              }
            });
          }
        }
        onAddTodoList={
          (text) => {
            store.dispatch({
              type: 'ADD_TODO_LIST',
              payload: {
                id: v4(),
                text,
                color: ColoresKeep[0]       
              }
            });
          }
        }
        />

        <ItemList
        items={ getVisibleItems(items, visibilityFilterItems, setsearch) }
        colors={ ColoresKeep }
        />

      </div>
      <GeneralFilter
      currentVisibilityFilter={ visibilityFilterItems }
      onFilterClicked={
        (filter) => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER_ITEMS',
            payload: { visibilityFilter: filter }
          });
        }
      } />

  </div>
);

const getVisibleTodos = (todos, visibilityFilter) => {
  if(visibilityFilter === 'SHOW_ALL'){
    return todos;
  }

  if(visibilityFilter === 'SHOW_COMPLETED'){
    return todos.filter(t => t.completed);
  }

  if(visibilityFilter === 'SHOW_ACTIVE'){
    return todos.filter(t => !t.completed);
  }
}

const TodoList = ({ todos, onTodoClicked, onRemoveTodo, onUpdateTodo }) => (
  <div>
    {
      todos.map(todo => {
        return(
        <Todo
          key={ todo.id }
          todo={ todo }
          onTodoClicked={ () => onTodoClicked(todo) }
          onRemoveTodo={ () => onRemoveTodo(todo) }
          onUpdateTodo={ onUpdateTodo }
        />
        );
    })
    }
  </div>
);

const ItemFooter = ({ currentVisibilityFilter, onFilterClicked }) => (
  <div class="footer">
    Filtra Por:
    <FilterLink
      visibilityFilter="SHOW_ALL"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Todos</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_COMPLETED"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Completados</FilterLink>
    {' '}
    <FilterLink
      visibilityFilter="SHOW_ACTIVE"
      currentVisibilityFilter={ currentVisibilityFilter }
      onFilterClicked={ onFilterClicked }>Activos</FilterLink>
  </div>
);

const TodosApp = ({ todos, visibilityFilter, itemId }) => (
  <div>
    <AddTodo
      class="element"
      onAddTodo={
        (text) => {
          store.dispatch({
            type: 'ADD_TODO',
            payload: {
              id: v4(),
              text,
              itemId
            }
          });
        }
      }>+</AddTodo>

    <TodoList
      todos={ getVisibleTodos(todos, visibilityFilter) }
      onTodoClicked={
        (todo) => {
          store.dispatch({
            type: 'TOGGLE_TODO',
            payload: {
              id: todo.id,
              itemId
            }
          });
        }
      }
      onRemoveTodo={
        (todo) => {
          store.dispatch({
            type: 'REMOVE_TODO',
            payload: {
              id: todo.id,
              itemId
            }
          });
        }
      }
      onUpdateTodo={
        (todo, text) => {
          store.dispatch({
            type: 'UPDATE_TODO',
            payload: {
              id: todo.id,
              itemId,
              text
            }
          })
        }
      }
       />
  
    <ItemFooter
      currentVisibilityFilter={ visibilityFilter }
      onFilterClicked={
        (filter) => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            payload: { 
              visibilityFilter: filter, 
              itemId }
          });
        }
      } />
      
  </div>
);

const render = () => {
  ReactDOM.render(
     <ItemsApp
      { ...store.getState().present } />,
    document.getElementById('root')
  );
  //debuggin
  console.log(store.getState());
};
render();
store.subscribe(render);
store.subscribe( () => {
  saveState(store.getState());
});