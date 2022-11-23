import React, {Component} from "react";

import PropTypes from 'prop-types';

import './task.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';


export default class Task extends Component {

  constructor () {
    super();

    this.state = {
      completed: false,
      editing: false,
      value: '',
      timestamp: new Date(),
      event: ''
    }

    this.onItemChange = (e) => {
      this.setState({
          value: e.target.value,
          timestamp: new Date()
      })
    }

  }

  render () {
    let {value, classNames, onDeleted, 
         onToggleCompleted,onToggleEdit, 
         completed, editing, onItemchange, mykey, hide, timestamp} = this.props;

    this.timestamp = formatDistanceToNow(timestamp, {includeSeconds: true })

    this.onSubmit = (e) => {
      e.preventDefault();
      onItemchange(mykey, this.state.value, this.state.timestamp, this.state.event);
      this.setState({
       value: ''
      })
    }

    this.onClick = (e, mykey) => {
      this.setState({
        event: e
      })
      onToggleCompleted(e, mykey)
    }

    if(completed){
      classNames = '';
      classNames += 'completed';
    };

    if(editing){
      classNames = '';
      classNames += 'editing';
    }

    if(hide) {
      classNames += ' toggle-all'
    }

    return (
      <li className={classNames? classNames : undefined}>
        <div className="view">
              <input id={mykey} className="toggle" type="checkbox" 
              onClick={this.onClick}/>
              <label htmlFor={mykey}>
                <span className="description">{value}</span>
                <span className="created">{this.timestamp}</span>
              </label>
              <button className="icon icon-edit"
              onClick={onToggleEdit}></button>
              <button className="icon icon-destroy"
              onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit"  defaultValue={value} onChange={this.onItemChange}/>
        </form>
      </li>
    );
  };
};

Task.defaultProps = {
  onItemChange: () => {},
  hide: false,
  completed: false,
  value: 'Task', 
  classNames: '',
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onToggleEdit: () => {}, 
  editing: false,
  mykey: 10,  
  timestamp: new Date()
};

Task.propTypes = {
  hide: PropTypes.bool,
  completed: PropTypes.bool,
  value: PropTypes.string, 
  classNames: PropTypes.string,
  editing: PropTypes.bool,
  mykey: PropTypes.number
}
