import React from "react";

import './task.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Task = ({value}) => {

    const res = formatDistanceToNow(new Date(), { addSuffix: true });
   
    return (
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>
                <span className="description">{value}</span>
                <span className="created">{res}</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy"></button>
            </div>
    );
};

export default Task;