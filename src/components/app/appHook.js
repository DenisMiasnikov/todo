import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import './app.css';
import Footer from '../footer';
import TaskList from '../taskList';
import NewTaskForm from '../newTaskForm';

function AppHooks() {
  const createItem = (value, time) => ({
    value,
    className: '',
    editing: false,
    completed: false,
    hide: false,
    id: nanoid(),
    timestamp: new Date(),
    timeLeft: time,
  });

  const [todos, setTodos] = useState([createItem('Create', 70), createItem('Edit', 80), createItem('Add', 90)]);
  const [filter, setFilter] = useState(todos);

  useEffect(() => {
    setFilter(todos);
    return () => {};
  }, [todos]);

  const addItem = (value, time) => {
    const newItem = createItem(value, time);

    setTodos((current) => [...current, newItem]);
  };

  const deleteItem = (id) => {
    setTodos((current) => {
      const idx = current.findIndex((el) => el.id === id);

      return [...current.slice(0, idx), ...current.slice(idx + 1)];
    });
  };

  const delAllCompleted = () => {
    setTodos((current) => {
      const newData = current.filter((item) => item.completed === false);

      return newData;
    });
  };

  const onToggleCompleted = (id) => {
    setTodos((current) => {
      const idx = current.findIndex((el) => el.id === id);
      const oldItem = current[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };

      return [...current.slice(0, idx), newItem, ...current.slice(idx + 1)];
    });
  };

  const onToggleEdit = (id) => {
    setTodos((current) => {
      const idx = current.findIndex((el) => el.id === id);
      const oldItem = current[idx];
      const newItem = { ...oldItem, editing: !oldItem.editing };

      return [...current.slice(0, idx), newItem, ...current.slice(idx + 1)];
    });
  };

  const onItemChange = (id, value, event) => {
    if (event !== '') {
      event.target.checked = false;
    }

    setTodos((current) => {
      const idx = current.findIndex((el) => el.id === id);
      const oldItem = current[idx];
      const newValue = { ...oldItem, value };
      const newItem = { ...newValue, editing: !newValue.editing, completed: false };

      return [...current.slice(0, idx), newItem, ...current.slice(idx + 1)];
    });
  };

  const hideCompleted = () => {
    setFilter(todos.filter((el) => el.completed === false));
  };

  const showCompleted = () => {
    setFilter(todos.filter((el) => el.completed === true));
  };

  const showAll = () => {
    setFilter(todos);
  };

  const completedCount = todos.filter((el) => el.completed).length;

  const todoCount = todos.length - completedCount;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addItem={addItem} />
      </header>
      <section className="main">
        <TaskList
          data={filter}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onToggleEdit={onToggleEdit}
          addItem={addItem}
          onItemChange={onItemChange}
        />
        <Footer
          count={todoCount}
          hideCompleted={hideCompleted}
          showCompleted={showCompleted}
          showAll={showAll}
          delAllCompleted={delAllCompleted}
        />
      </section>
    </section>
  );
}

export default AppHooks;
