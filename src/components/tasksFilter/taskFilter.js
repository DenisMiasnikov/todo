import React, {Component} from "react";

import './taskFilter.css'

export default class TaskFilter extends Component {
  
  constructor () {
    super ()

    this.state = {
      all: true,
      active: false,
      completed: false
    }

    this.onClick = (e) => {
      if(e.target.innerHTML === 'All') {
        this.setState({
          all: true,
          active: false,
          completed: false
        })
      } else if (e.target.innerHTML === 'Active') {
        this.setState({
          all: false,
          active: true,
          completed: false
        })
      } else if (e.target.innerHTML === 'Completed') {
        this.setState({
          all: false,
          active: false,
          completed: true
        })
      }
    }

  }
  

  render() {

    let {hideCompleted, showCompleted, showAll, all, active, completed} = this.props;


    this.showAll = e => {
      showAll(e);
      this.onClick(e);
    }

    this.hideCompleted = e => {
      hideCompleted(e);
      this.onClick(e);
    }

    this.showCompleted = e => {
      showCompleted(e);
      this.onClick(e);
    }

    if (this.state.all) {
      all = 'selected'
    }

    if (this.state.active) {
      active = 'selected'
    }
    
    if (this.state.completed) {
      completed = 'selected'
    }

    return (
      <ul className="filters">
          <li>
            <button className={all} onClick={this.showAll} >All</button>
          </li>
          <li>
            <button className={active} onClick={this.hideCompleted}>Active</button>
          </li>
          <li>
            <button className={completed} onClick={this.showCompleted}>Completed</button>
          </li>
      </ul>
  );
  }
}
