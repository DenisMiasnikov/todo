/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function Task(props) {
  const {
    timeLeft,
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
  } = props;

  const [myState, setMyState] = useState({
    myCompleted: false,
    newvalue: '',
    event: '',
    time: 0,
    counting: false,
    className: '',
  });

  const className = useMemo(() => {
    if (completed && hide) {
      return 'completed toggle-all';
    }
    if (completed) {
      return 'completed';
    }
    if (editing) {
      return 'editing';
    }
    if (hide) {
      return 'toggle-all';
    }
    return '';
  }, [completed, editing, hide]);

  const { newvalue, event, time, counting } = myState;

  if (myState.time === 0) {
    setMyState((current) => ({ ...current, time: current.time + timeLeft }));
  }

  const onItemChange = (e) => {
    setMyState((current) => ({ ...current, newvalue: e.target.value }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 1 && counting) {
        setMyState((current) => ({ ...current, time: current.time - 1 }));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [time, counting]);

  const start = () => {
    setMyState((current) => ({ ...current, counting: true }));
  };

  const pause = () => {
    setMyState((current) => ({ ...current, counting: false }));
  };

  const getPadTime = (times) => times.toString().padStart(2, '0');
  const minutes = getPadTime(Math.floor(time / 60));
  const seconds = getPadTime(time - minutes * 60);

  const realTimestamp = formatDistanceToNow(timestamp, { includeSeconds: true });

  const onSubmit = (e) => {
    e.preventDefault();
    if (newvalue !== '') {
      onItemchange(mykey, newvalue, event);
      setMyState((current) => ({ ...current, newvalue: '' }));
    } else {
      onItemchange(mykey, value, event);
      setMyState((current) => ({ ...current, newvalue: '' }));
    }
  };

  const onMyClick = (e) => {
    onToggleCompleted(mykey);
    setMyState((current) => ({ ...current, event: e }));
  };

  return (
    <li className={className}>
      <div className="view">
        <input id={mykey} className="toggle" type="checkbox" onClick={onMyClick} />
        <label htmlFor={mykey}>
          <span className="title">{value}</span>
          <span className="description">
            <button type="button" className="icon icon-play" onClick={start} />
            <button type="button" className="icon icon-pause" onClick={pause} />
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </span>
          <span className="description">{realTimestamp}</span>
        </label>
        <button type="button" aria-label="Save" className="icon icon-edit" onClick={onToggleEdit} />
        <button type="button" aria-label="Save" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" className="edit" defaultValue={value} onChange={onItemChange} />
      </form>
    </li>
  );
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
