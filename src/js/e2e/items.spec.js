import items from '../reducers/items';

const testItemAddNote = () => {
  const stateBefore = [];

  const action = {
    type: 'ADD_NOTE',
    payload: {
                id: 0,
                text: "prueba",
                color: "white",
                create_date: 'enero',
                modified_date: 'febrero'
              }
  }
  const stateAfter = [{
    id: 0,
    text: "prueba",
    color: "white",
    isNote: true,
    create_date: 'enero',
    modified_date: 'febrero',
    archived: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    items(stateBefore,action)
  ).toEqual(stateAfter)
}

const testItemAddTodoList = () => {
  const stateBefore = [];

  const action = {
    type: 'ADD_TODO_LIST',
    payload: {
                id: 0,
                text: "prueba",
                color: "white",
                create_date: 'enero',
                modified_date: 'febrero'
              }
  }
  const stateAfter = [{
    id: 0,
    text: "prueba",
    color: "white",
    isNote: true,
    create_date: 'enero',
    modified_date: 'febrero',
    archived: false
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    items(stateBefore,action)
  ).toEqual(stateAfter)
}

testItemAddNote();
console.log("All test passed");