import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../tasksFilter';
import './footer.css';

function Footer(props) {
  const { count, delAllCompleted, hideCompleted, showCompleted, showAll } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TaskFilter hideCompleted={hideCompleted} showCompleted={showCompleted} showAll={showAll} />
      <button type="button" className="clear-completed" onClick={delAllCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;

Footer.defaultProps = {
  count: 'Some',
  delAllCompleted: () => {},
  hideCompleted: () => {},
  showCompleted: () => {},
  showAll: () => {},
};

Footer.defaultProps = {
  count: PropTypes.number || PropTypes.string,
};
