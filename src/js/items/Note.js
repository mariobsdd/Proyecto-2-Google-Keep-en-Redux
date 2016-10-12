import React from 'react';

export const Note = ({ note, onUpdateNote }) => {
  let input;
  return (
    <input
      class="note"
      defaultValue={ note.text }
      ref={ node => input = node }
      onChange={ () => onUpdateNote(note.id, input.value) }
    />
  );
}

export default Note;