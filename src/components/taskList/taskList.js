import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Task from '../task';
import './taskList.css';

export default function TaskList(props) {
  const { data, onDeleted, onToggleCompleted, onToggleEdit, onItemChange } = props;

  const elements = data.map((item) => {
    const { ...itemProps } = item;

    return (
      <Task
        {...itemProps}
        key={item.id}
        onDeleted={() => onDeleted(item.id)}
        onToggleCompleted={() => onToggleCompleted(item.id)}
        onToggleEdit={() => onToggleEdit(item.id)}
        onItemchange={onItemChange}
        mykey={item.id}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.deafultProps = {
  data: {
    value: 'Some Task',
    className: '',
    editing: false,
    completed: false,
    hide: false,
    id: 10,
    timestamp: new Date(),
  },
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onToggleEdit: () => {},
  onItemChange: () => {},
};

TaskList.propTypes = {
  data: PropTypes.array,
};
