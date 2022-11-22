import React, {Component} from 'react';

import './app.css';
import Footer from '../footer';
import TaskList from '../taskList';
import NewTaskForm from '../newTaskForm';


export default class App extends Component {

    constructor() {
        super()

        this.maxId = 100;

        this.createItem = (value) => {
            return {
                value,
                className: '',
                editing: false,
                completed: false,
                hide: false,
                id: this.maxId++,
                myChecked: false
            };
        }

        this.addItem = (value) => {
            const newItem = this.createItem(value);

            this.setState(({todoData}) => {
                const newData = [...todoData, newItem];
                return {
                    todoData: newData
                }
            })
        }

        this.state = {
            todoData: [
                this.createItem('Create'),
                this.createItem('Edit'),
                this.createItem('Add'),
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

        this.delAllCompleted = () => {
            this.setState(({todoData}) => {

                const newData = todoData.filter((item) => item.completed === false)

                return {
                    todoData: newData
                }
            })
        }


        this.onToggleCompleted = (id) => {
            this.setState(({todoData}) => {
                const idx = todoData.findIndex((el) => el.id === id);
                const oldItem = todoData[idx];
                const newItem = {...oldItem, completed: !oldItem.completed};

                const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

                return{
                    todoData: newData
                }
            })
        }

        this.onToggleEdit = (id) => {
            this.setState(({todoData}) => {
                const idx = todoData.findIndex((el) => el.id === id);
                const oldItem = todoData[idx];
                const newItem = {...oldItem, editing: !oldItem.editing};

                const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

                return{
                    todoData: newData
                }
            })
        }

        this.onItemChange = (id, value) => {
            this.setState(({todoData}) => {
                const idx = todoData.findIndex((el) => el.id === id);
                const oldItem = todoData[idx];
                const newValue = {...oldItem, value: value};
                const newItem = {...newValue, editing: !newValue.editing};
               
                const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
                
                return {
                    todoData: newData
                }
            })
            
        }

        this.hideCompleted = (e) => {
            
                this.setState(({todoData}) => {
                    const newData = todoData.map(element => {
                        if (element.completed === true) {
                            element.hide = true;
                        } else if (element.completed === false){
                            element.hide = false;
                        }
                        return element
                    })
    
                    const target = e.target;
                    target.className = 'selected'
    
                    return{
                        todoData: newData
                    }
                })
        }

        this.showCompleted = () => {
            this.setState(({todoData}) => {
                const newData = todoData.map(element => {
                    if (element.completed === true) {
                        element.hide = false;
                    } else if (element.completed === false){
                        element.hide = true;
                    }
                    return element
                })

                return{
                    todoData: newData
                }
            })
        }

        this.showAll = () => {
            this.setState(({todoData}) => {
                const newData = todoData.map(element => {
                    if (element.hide === true) {
                        element.hide = !element.hide;
                    } else {
                        return element
                    }
                    return element
                })
    
                return{
                    todoData: newData
                }
            })
        }
    }

    render () {

        const completedCount = this.state.todoData.filter((el) => el.completed).length;

        const todoCount = this.state.todoData.length - completedCount;


        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm addItem={this.addItem}/>
                </header>
                <section className="main">
                    <TaskList data={this.state.todoData}
                    onDeleted={this.deleteItem}
                    onToggleCompleted={this.onToggleCompleted}
                    onToggleEdit={this.onToggleEdit}
                    addItem={this.addItem}
                    onItemChange={this.onItemChange}/>
                     <Footer 
                     count={todoCount}
                     hideCompleted={this.hideCompleted}
                     showCompleted={this.showCompleted}
                     showAll={this.showAll}
                     delAllCompleted={this.delAllCompleted}/>
                </section>
            </section>
        )
    }
}


