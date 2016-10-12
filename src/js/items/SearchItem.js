import React from 'react';
//react para la busqueda
export const SearchItem = ({onSearchItem, setsearch}) => {
  let input;
  return (
    <div class="head">
      <img class="logo" src="./media/logo.png" height="120px" width="120px"/>
      <div class="navbar">
        <input
          placeholder={ 'Busca aquí lo que quieras.' }
          defaultValue= { setsearch.search }
          ref={ node => input = node }
          onChange={ () => onSearchItem(input.value) }
          onKeyDown={
            (event) => {
              if(event.keyCode === 27){
                input.value = "";
                onSearchItem(input.value);
              }
            }
          } 
        />
        <img class="icon" src="./media/lupa.png" height="25px" width="25px"/>
        </div>
    </div>

  );
}

export default SearchItem;