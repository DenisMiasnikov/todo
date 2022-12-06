/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react/no-unknown-property */
import React, { Component } from 'react';

import './newTaskForm.css';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      newvalue: '',
      min: '',
      sec: '',
    };

    this.onItemChange = (e) => {
      if (e.target.name === 'text') {
        this.setState({
          newvalue: e.target.value,
        });
      } else if (e.target.name === 'hour') {
        this.setState({
          min: e.target.value,
        });
      } else if (e.target.name === 'minutes') {
        this.setState({
          sec: e.target.value,
        });
      }
    };
  }

  render() {
    const { newvalue, min, sec } = this.state;
    const { addItem } = this.props;

    this.onSubmit = (e) => {
      const time = Number(e.target[1].value * 60) + Number(e.target[2].value);
      e.preventDefault();
      if (newvalue !== '') {
        addItem(newvalue, time);
        this.setState({
          newvalue: '',
          min: '',
          sec: '',
        });
      }
    };

    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          onChange={this.onItemChange}
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
          onChange={this.onItemChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          name="minutes"
          autoComplete="off"
          value={sec}
          onChange={this.onItemChange}
        />
        <input type="submit" className="invisible" value="submit" />
      </form>
    );
  }
}
