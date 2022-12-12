/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';

import './newTaskForm.css';

function NewTaskForm(props) {
  const [myState, setMyState] = useState({
    newvalue: '',
    min: '',
    sec: '',
  });

  const onItemChange = (e) => {
    setMyState((current) => ({ ...current, newvalue: e.target.value }));
  };

  const onMinChange = (e) => {
    setMyState((current) => ({ ...current, min: e.target.value }));
  };

  const onSecChange = (e) => {
    setMyState((current) => ({ ...current, sec: e.target.value }));
  };

  const { newvalue, min, sec } = myState;
  const { addItem } = props;

  const onSubmit = (e) => {
    const time = Number(e.target[1].value * 60) + Number(e.target[2].value);
    e.preventDefault();
    if (newvalue !== '') {
      addItem(newvalue, time);
    }
    setMyState({
      newvalue: '',
      min: '',
      sec: '',
    });
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        onChange={onItemChange}
        placeholder="What needs to be done?"
        value={newvalue}
        name="text"
        autoComplete="off"
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        name="hour"
        autoComplete="off"
        value={min}
        onChange={onMinChange}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        name="minutes"
        autoComplete="off"
        value={sec}
        onChange={onSecChange}
      />
      <input type="submit" className="invisible" value="submit" />
    </form>
  );
}

export default NewTaskForm;
