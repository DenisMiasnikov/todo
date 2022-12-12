import React, { useState } from 'react';

import './taskFilter.css';

export default function TaskFilter(props) {
  const [myState, setMyState] = useState({
    allItems: 'selected',
    activeItems: '',
    completedItems: '',
  });

  const onAll = (e) => {
    setMyState({
      allItems: 'selected',
      activeItems: '',
      completedItems: '',
    });
  };

  const onActive = (e) => {
    setMyState({
      allItems: '',
      activeItems: 'selected',
      completedItems: '',
    });
  };

  const onCompleted = (e) => {
    setMyState({
      allItems: '',
      activeItems: '',
      completedItems: 'selected',
    });
  };

  const { hideCompleted, showCompleted, showAll } = props;
  const { allItems, activeItems, completedItems } = myState;

  const filterAll = (e) => {
    showAll(e);
    onAll(e);
  };

  const filterActive = (e) => {
    hideCompleted(e);
    onActive(e);
  };

  const filterCompleted = (e) => {
    showCompleted(e);
    onCompleted(e);
  };

  return (
    <form>
      <ul className="filters">
        <li>
          <input className="hide" type="radio" id="all" value="all" name="filter" defaultChecked onClick={filterAll} />
          <label className={allItems} htmlFor="all">
            All
          </label>
        </li>
        <li>
          <input className="hide" type="radio" id="active" value="active" name="filter" onClick={filterActive} />
          <label className={activeItems} htmlFor="active">
            Active
          </label>
        </li>
        <li>
          <input
            className="hide"
            type="radio"
            id="completed"
            value="completed"
            name="filter"
            onClick={filterCompleted}
          />
          <label className={completedItems} htmlFor="completed">
            Completed
          </label>
        </li>
      </ul>
    </form>
  );
}
