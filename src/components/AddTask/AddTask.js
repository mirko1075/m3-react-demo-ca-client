// src/components/AddTask/AddTask.js

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, 'src/.env') })
// console.log('PATH', path.resolve(__dirname, 'src/.env') )
// const SERVER_HOST= process.env.SERVER_HOST
// const SERVER_PORT=process.env.SERVER_PORT

const SERVER_HOST="macair"
const SERVER_PORT=5000

class AddTask extends Component {
  state = { 
    title: '',
    description: '',
    isShowing: false
  };

   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    const { id } = this.props.match.params;

 // we need to know to which project the task belongs, 
 // therefore we get it's 'id'

    axios.post("http://"+SERVER_HOST+":"+SERVER_PORT+"/api/tasks/", { title, description, projectId: id })
      .then( () => {

     // after form submit, GET project again to display the updated task list  
        this.props.getUpdatedProject();
        this.setState({title: '', description: ''});
    })
    .catch( error => console.log(error) )
}
  
  
  toggleForm = () => this.setState({isShowing: !this.state.isShowing});



  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  
  
  displayForm = () => {
    return(
      <div>
        <form>
          <input 
            type="text" 
            placeholder='Title'
            name="title" 
            value={this.state.title}
            onChange={this.handleChange}
          />

          <input 
            name="description" 
            placeholder='Description'
            value={this.state.description}
            onChange={this.handleChange}
          />

          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    )
  }
  

  render(){
    return(
      <div>
        <button onClick={this.toggleForm}> 
          {this.state.isShowing ? 'Close' : 'Add task'}
        </button>

        {
          !this.state.isShowing 
            ? null
            : this.displayForm()
        }
      </div>
    )
  }
}

export default withRouter(AddTask);