import React, {Component} from 'react';

import Task from '../task';
import './taskList.css'

export default class TaskList extends Component {

  render () {

    const {data, onDeleted, onToggleCompleted, onToggleEdit, onItemChange} = this.props;

    this.elements = data.map((item) => {

      const {...itemProps} = item;
    
      return (
              <Task {...itemProps}
              key={item.id}
              onDeleted={() => onDeleted(item.id)}
              onToggleCompleted={() => onToggleCompleted(item.id)}
              onToggleEdit={() => onToggleEdit(item.id)}
              onItemchange={onItemChange}
              mykey={item.id}/>       
      );
    });

    return (
      <ul className='todo-list'>
          {this.elements}
      </ul>
    );
  }
}
