import React from 'react';


//componente para titulos de un item
export const Titulo = ({item, onUpdateTitle}) => {
  let input;
  return (
    <div>
      <input
        class="header"
        placeholder='Título'
        defaultValue={ item.title }
        ref={ node => input = node }
        onChange={ () => onUpdateTitle(item.id, input.value) }
      />

    </div>
  );
}

export default Titulo;