import React, {Component} from 'react';

import Task from '../task';
import './taskList.css'

export default class TaskList extends Component {

  render () {

    const {data, onDeleted} = this.props;

    this.elements = data.map((item) => {

      const {...itemProps} = item;
    
      return (
              <Task {...itemProps} 
              onDeleted={() => onDeleted(item.id)}/>       
      );
    });

    return (
      <ul className='todo-list'>
          {this.elements}
      </ul>
    );
  }
}
