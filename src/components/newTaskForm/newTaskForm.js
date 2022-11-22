import React, {Component} from "react";

import './newTaskForm.css'

export default class NewTaskForm extends Component {

    

    state = {
        value: ''
    }

    onItemChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    onSubmit = (e) => {
       e.preventDefault();
       this.props.addItem(this.state.value);
       this.setState({
        value: ''
       })
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
               <input className="new-todo" 
                      onChange={this.onItemChange} 
                      placeholder="What needs to be done?" 
                      autoFocus 
                      value={this.state.value}/> 
            </form>
        );
    }
};

