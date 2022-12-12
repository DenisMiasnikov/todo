import React, { useState } from 'react';
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

  const [myState, setMyState] = useState({
    todoData: [createItem('Create', 70), createItem('Edit', 80), createItem('Add', 90)],
  });

  const addItem = (value, time) => {
    const newItem = createItem(value, time);

    setMyState(({ todoData }) => {
      const newData = [...todoData, newItem];
      return {
        todoData: newData,
      };
    });
  };

  const deleteItem = (id) => {
    setMyState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  const delAllCompleted = () => {
    setMyState(({ todoData }) => {
      const newData = todoData.filter((item) => item.completed === false);

      return {
        todoData: newData,
      };
    });
  };

  const onToggleCompleted = (id) => {
    setMyState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };

      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  const onToggleEdit = (id) => {
    setMyState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, editing: !oldItem.editing };

      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  const onItemChange = (id, value, event) => {
    if (event !== '') {
      event.target.checked = false;
    }

    setMyState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newValue = { ...oldItem, value };
      const newItem = { ...newValue, editing: !newValue.editing, completed: false };

      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newData,
      };
    });
  };

  const hideCompleted = () => {
    setMyState(({ todoData }) => {
      const newData = todoData.map((element) => {
        element.hide = element.completed;
        return element;
      });
      return {
        todoData: newData,
      };
    });
  };

  const showCompleted = () => {
    setMyState(({ todoData }) => {
      const newData = todoData.map((element) => {
        element.hide = !element.completed;
        return element;
      });

      return {
        todoData: newData,
      };
    });
  };

  const showAll = () => {
    setMyState(({ todoData }) => {
      const newData = todoData.map((element) => {
        if (element.hide === true) {
          element.hide = !element.hide;
        } else {
          return element;
        }
        return element;
      });

      return {
        todoData: newData,
      };
    });
  };

  const { todoData } = myState;

  const completedCount = todoData.filter((el) => el.completed).length;

  const todoCount = todoData.length - completedCount;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm addItem={addItem} />
      </header>
      <section className="main">
        <TaskList
          data={todoData}
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
