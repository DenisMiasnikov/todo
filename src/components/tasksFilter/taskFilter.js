import React, {Component} from "react";

import PropTypes from 'prop-types';

import './taskFilter.css';

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
          allItems: true,
          activeItems: false,
          completedItems: false
        })
      } else if (e.target.innerHTML === 'Active') {
        this.setState({
          allItems: false,
          activeItems: true,
          completedItems: false
        })
      } else if (e.target.innerHTML === 'Completed') {
        this.setState({
          allItems: false,
          activeItems: false,
          completedItems: true
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

    if (this.state.allItems) {
      all = 'selected'
    }

    if (this.state.activeItems) {
      active = 'selected'
    }
    
    if (this.state.completedItems) {
      completed = 'selected'
    }

    return (
      <ul className="filters">
          <li>
            <button className={all ? all : undefined} onClick={this.showAll} >All</button>
          </li>
          <li>
            <button className={active ? active : undefined} onClick={this.hideCompleted}>Active</button>
          </li>
          <li>
            <button className={completed ? completed: undefined} onClick={this.showCompleted}>Completed</button>
          </li>
      </ul>
  );
  }
};

// TaskFilter.defaultProps = {
//   hideCompleted: () => {}, 
//   showCompleted: () => {}, 
//   showAll: () => {}, 
//   all: true, 
//   active: false, 
//   completed: false
// };

TaskFilter.propTypes = {
  all: PropTypes.bool,
  active: PropTypes.bool,
  completed: PropTypes.bool,
}
