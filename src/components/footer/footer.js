import React, {Component} from "react";

import TaskFilter from "../tasksFilter";
import './footer.css'

export default class Footer extends Component {

  render () {
    const {count, delAllCompleted, hideCompleted, showCompleted, showAll} = this.props;
    

    return (
      <footer className="footer">
        <span className="todo-count">{count} items left</span>
        <TaskFilter hideCompleted={hideCompleted} showCompleted={showCompleted} showAll={showAll}/>
        <button className="clear-completed"
                onClick={delAllCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
  
}
