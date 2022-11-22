import React, {Component} from "react";

import './task.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class Task extends Component {

  constructor () {
    super();

    this.state = {
      completed: false,
      editing: false,
      myChecked: false,
      value: ''
    }

    this.onItemChange = (e) => {
      this.setState({
          value: e.target.value
      })
  }

  
  

    this.myCheck = () =>{
      this.setState(({myChecked}) => {
        return {
          myChecked: !myChecked
        }
      });
    }

  }

  render () {

    let {value, classNames, onDeleted, onToggleCompleted,onToggleEdit, completed, editing, myChecked, onItemchange, mykey, hide} = this.props;

    this.onSubmit = (e) => {
      e.preventDefault();
      onItemchange(mykey, this.state.value);
      this.setState({
       value: ''
      })
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

    if(myChecked) {
      myChecked = true;
    }
    
    const res = formatDistanceToNow(new Date(), { addSuffix: true });
   
    return (
      <li className={classNames}>
        <div className="view">
              <input id='itemCompleted' className="toggle" type="checkbox" defaultChecked={myChecked}
              onClick={this.myCheck}/>
              <label htmlFor='itemCompleted'>
                <span className="description"
                onClick={onToggleCompleted}>{value}</span>
                <span className="created">{res}</span>
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

