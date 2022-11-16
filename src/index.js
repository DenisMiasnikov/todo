import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Footer from './components/footer';
import TaskList from './components/taskList';
import NewTaskForm from './components/newTaskForm/newTaskForm';
// import App from './components/todoApp'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm />
      </header>
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
);
