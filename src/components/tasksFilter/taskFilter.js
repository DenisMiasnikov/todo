import React, { Component } from 'react';

import './taskFilter.css';

export default class TaskFilter extends Component {
  constructor() {
    super();

    this.state = {
      allItems: 'selected',
      activeItems: '',
      completedItems: '',
    };
    this.onClick = (e) => {
      if (e.target.value === 'all') {
        this.setState({
          allItems: 'selected',
          activeItems: '',
          completedItems: '',
        });
      } else if (e.target.value === 'active') {
        this.setState({
          allItems: '',
          activeItems: 'selected',
          completedItems: '',
        });
      } else if (e.target.value === 'completed') {
        this.setState({
          allItems: '',
          activeItems: '',
          completedItems: 'selected',
        });
      }
    };
  }

  render() {
    const { hideCompleted, showCompleted, showAll } = this.props;
    const { allItems, activeItems, completedItems } = this.state;

    this.showAll = (e) => {
      showAll(e);
      this.onClick(e);
    };

    this.hideCompleted = (e) => {
      hideCompleted(e);
      this.onClick(e);
    };

    this.showCompleted = (e) => {
      showCompleted(e);
      this.onClick(e);
    };

    return (
      <form>
        <ul className="filters">
          <li>
            <input
              className="hide"
              type="radio"
              id="all"
              value="all"
              name="filter"
              defaultChecked
              onClick={this.showAll}
            />
            <label className={allItems} htmlFor="all">
              All
            </label>
          </li>
          <li>
            <input
              className="hide"
              type="radio"
              id="active"
              value="active"
              name="filter"
              onClick={this.hideCompleted}
            />
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
              onClick={this.showCompleted}
            />
            <label className={completedItems} htmlFor="completed">
              Completed
            </label>
          </li>
        </ul>
      </form>
    );
  }
}
