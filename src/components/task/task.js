import React, {Component} from "react";

import './task.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class Task extends Component {

  constructor () {
    super();



    this.state = {
      completed: false,
      editing: false,
    }

    this.onItemClick = () => {
      this.setState(({completed}) => {
        return {
          completed: !completed
        }
      });
    };

    this.onEdingClick = () => {
      this.setState({
        editing: true
      });
    }

  }

  render () {

    let {value, classNames, id, onDeleted} = this.props;

    const {completed, editing,} = this.state;

    if(completed){
      classNames += 'completed';
    };

    if(editing){
      classNames = '';
      classNames += 'editing';
    }

    
    
    const res = formatDistanceToNow(new Date(), { addSuffix: true });
   
    return (
      <li id={id}className={classNames}>
        <div className="view">
              <input className="toggle" type="checkbox" />
              <label>
                <span className="description"
                onClick={this.onItemClick}>{value}</span>
                <span className="created">{res}</span>
              </label>
              <button className="icon icon-edit"
              onClick={this.onEdingClick}></button>
              <button className="icon icon-destroy"
              onClick={onDeleted}></button>
            </div>
            <input type="text" className="edit" value="Editing task" readOnly/>
      </li>
    );
  };
};

// const Task = ({value}) => {

//     const res = formatDistanceToNow(new Date(), { addSuffix: true });
   
//     return (
//             <div className="view">
//               <input className="toggle" type="checkbox" />
//               <label>
//                 <span className="description">{value}</span>
//                 <span className="created">{res}</span>
//               </label>
//               <button className="icon icon-edit"></button>
//               <button className="icon icon-destroy"></button>
//             </div>
//     );
// };

// export default Task;