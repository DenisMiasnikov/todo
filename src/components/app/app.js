import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import './app.css';
import Footer from '../footer';
import TaskList from '../taskList';
import NewTaskForm from '../newTaskForm';

export default class App extends Component {
  constructor() {
    super();

    this.createItem = (value, time) => ({
      value,
      className: '',
      editing: false,
      completed: false,
      hide: false,
      id: nanoid(),
      timestamp: new Date(),
      timeLeft: time,
    });

    this.addItem = (value, time) => {
      const newItem = this.createItem(value, time);

      this.setState(({ todoData }) => {
        const newData = [...todoData, newItem];
        return {
          todoData: newData,
        };
      });
    };

    this.state = {
      todoData: [this.createItem('Create', 70), this.createItem('Edit', 80), this.createItem('Add', 90)],
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);

        const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

        return {
          todoData: newData,
        };
      });
    };

    this.delAllCompleted = () => {
      this.setState(({ todoData }) => {
        const newData = todoData.filter((item) => item.completed === false);

        return {
          todoData: newData,
        };
      });
    };

    this.onToggleCompleted = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = { ...oldItem, completed: !oldItem.completed };

        const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        return {
          todoData: newData,
        };
      });
    };

    this.onToggleEdit = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = { ...oldItem, editing: !oldItem.editing };

        const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        return {
          todoData: newData,
        };
      });
    };

    this.onItemChange = (id, value, event) => {
      if (event !== '') {
        event.target.checked = false;
      }

      this.setState(({ todoData }) => {
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

    this.hideCompleted = () => {
      this.setState(({ todoData }) => {
        const newData = todoData.map((element) => {
          element.hide = element.completed;
          return element;
        });
        return {
          todoData: newData,
        };
      });
    };

    this.showCompleted = () => {
      this.setState(({ todoData }) => {
        const newData = todoData.map((element) => {
          element.hide = !element.completed;
          return element;
        });

        return {
          todoData: newData,
        };
      });
    };

    this.showAll = () => {
      this.setState(({ todoData }) => {
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
  }

  render() {
    const { todoData } = this.state;

    const completedCount = todoData.filter((el) => el.completed).length;

    const todoCount = todoData.length - completedCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            data={todoData}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEdit={this.onToggleEdit}
            addItem={this.addItem}
            onItemChange={this.onItemChange}
          />
          <Footer
            count={todoCount}
            hideCompleted={this.hideCompleted}
            showCompleted={this.showCompleted}
            showAll={this.showAll}
            delAllCompleted={this.delAllCompleted}
          />
        </section>
      </section>
    );
  }
}
