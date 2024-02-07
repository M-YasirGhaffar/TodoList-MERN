import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import ToDo from './components/ToDo';
import { addToDo, getAllToDo, updateToDo, deleteToDo } from './utils/HandleApi';

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState('');
  const inputRef = useRef();

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  }

  const handleButtonClick = () => {
    const button = document.querySelector('.add');

    if (inputRef.current.value.trim()) {
      if (button && button.textContent === 'Update') {
        updateToDo(toDoId, inputRef.current.value, setText, setToDo, setIsUpdating);
      } else {
        addToDo(inputRef.current.value, setText, setToDo);
      }
    } else {
      alert('Input cannot be empty!')
    }
  }

  const handleClick = () => {
    const button = document.querySelector('.add');

    if (inputRef.current.value.trim()) {
      if (button && button.textContent === 'Update') {
        updateToDo(toDoId, inputRef.current.value, setText, setToDo, setIsUpdating);
      } else {
        addToDo(inputRef.current.value, setText, setToDo);
      }
    } else {
      alert('Input cannot be empty!')
    }

  }

  return (
    <>
      <div className='App'>
        <div className='container'>
          <h1>Taskify</h1>
          <div className='top'>
            <input
              id='myInput'
              placeholder='e.g. Get some milk, dad.'
              value={text}
              onKeyDown={handleKeyDown}
              ref={inputRef}
              onChange={(e) => { setText(e.target.value) }}
            />
            <div
              className='add'
              onClick={handleClick}>
              {isUpdating ? 'Update' : 'Add'}
            </div>
          </div>
          <div className='list'>
            {toDo.map(item => (
              <ToDo
                text={item.text}
                key={item._id}
                updateMode={() => {
                  updateMode(item._id, item.text);
                }}
                deleteToDo={() => {
                  deleteToDo(item._id, setToDo);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;