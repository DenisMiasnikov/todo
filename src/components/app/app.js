import React, {Component} from 'react';

import './app.css';
import Footer from '../footer';
import TaskList from '../taskList';
import NewTaskForm from '../newTaskForm';
//import { id } from 'date-fns/locale';

export default class App extends Component {

    constructor() {
        super()

        this.state = {
            todoData: [
                { value: 'Completed', classNames: 'completed', id:1 },
                { value: 'Editing', classNames: 'editing', id:2 },
                { value: 'SimplTask', classNames: '', id:3 }
            ]
        }
    
        this.deleteItem = (id) => {
            this.setState(({todoData}) => {
                const idx = todoData.findIndex((el) => el.id === id)
    
                const newData = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
    
                return {
                    todoData: newData
                }
            })
        }
    }

    render () {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm />
                </header>
                <section className="main">
                    <TaskList data={this.state.todoData}
                    onDeleted={this.deleteItem}/>
                     <Footer />
                </section>
            </section>
        )
    }
}


