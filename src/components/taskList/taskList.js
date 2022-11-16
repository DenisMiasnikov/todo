import React from 'react';

import Task from '../task';
import './taskList.css'

const TaskList = () => {
    return (
        <ul className="todo-list">
          <li className="completed">
            <Task />
          </li>
          <li className="editing">
            <Task />
            <input type="text" className="edit" value="Editing task" readOnly/>
          </li>
          <li>
            <Task />
          </li>
        </ul>
    );
};

export default TaskList;