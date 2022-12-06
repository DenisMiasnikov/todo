/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class Task extends Component {
  constructor(props) {
    super(props);

    const { timeLeft } = this.props;

    this.state = {
      newvalue: '',
      event: '',
      time: timeLeft,
      timer: 0,
      counting: false,
    };

    this.onItemChange = (e) => {
      this.setState({
        newvalue: e.target.value,
      });
    };

    this.count = () => {
      const interval = setInterval(() => {
        const { time, counting } = this.state;
        const newTime = time - 1;
        if (time >= 1 && counting) {
          this.setState({
            time: newTime,
          });
        }
      }, 1000);
      this.setState({
        timer: interval,
      });
    };

    this.start = () => {
      this.setState({
        counting: true,
      });
    };

    this.pause = () => {
      this.setState({
        counting: false,
      });
    };
  }

  componentDidMount() {
    this.count();
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer);
  }

  render() {
    const {
      value,
      onDeleted,
      onToggleCompleted,
      onToggleEdit,
      completed,
      editing,
      onItemchange,
      mykey,
      hide,
      timestamp,
      classNames,
    } = this.props;

    const { newvalue, event, time } = this.state;
    const getPadTime = (times) => times.toString().padStart(2, '0');

    const minutes = getPadTime(Math.floor(time / 60));
    const seconds = getPadTime(time - minutes * 60);

    this.className = classNames;

    this.timestamp = formatDistanceToNow(timestamp, { includeSeconds: true });

    this.onSubmit = (e) => {
      e.preventDefault();
      if (newvalue !== '') {
        onItemchange(mykey, newvalue, event);
        this.setState({
          newvalue: '',
        });
      } else {
        onItemchange(mykey, value, event);
        this.setState({
          newvalue: '',
        });
      }
    };

    this.onClick = (e) => {
      this.setState({
        event: e,
      });
      onToggleCompleted(e, mykey);
    };

    if (completed) {
      this.className = '';
      this.className += 'completed';
    }

    if (editing) {
      this.className = '';
      this.className += 'editing';
    }

    if (hide) {
      this.className += ' toggle-all';
    }

    return (
      <li className={this.className || undefined}>
        <div className="view">
          <input id={mykey} className="toggle" type="checkbox" onClick={this.onClick} />
          <label htmlFor={mykey}>
            <span className="title">{value}</span>
            <span className="description">
              <button type="button" className="icon icon-play" onClick={this.start} />
              <button type="button" className="icon icon-pause" onClick={this.pause} />
              <span>{minutes}</span>
              <span>:</span>
              <span>{seconds}</span>
            </span>
            <span className="description">{this.timestamp}</span>
          </label>
          <button type="button" aria-label="Save" className="icon icon-edit" onClick={onToggleEdit} />
          <button type="button" aria-label="Save" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" defaultValue={value} onChange={this.onItemChange} />
        </form>
      </li>
    );
  }
}

Task.defaultProps = {
  hide: false,
  completed: false,
  value: 'Task',
  editing: false,
  mykey: 10,
};

Task.propTypes = {
  hide: PropTypes.bool,
  completed: PropTypes.bool,
  value: PropTypes.string,
  editing: PropTypes.bool,
  mykey: PropTypes.string,
};
