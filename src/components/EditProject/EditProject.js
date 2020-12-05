// src/components/EditProject/EditProject.js

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

class EditProject extends Component {
  state = {
    title: "", 
    description: "",
    tasks: []
  }
  
    
  handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;
    const { id } = this.props.match.params;
  
    axios.put("http://"+SERVER_HOST+":"+SERVER_PORT+"/api/projects/"+id,
      { title, description }
    )
    .then( () => {
      this.props.getTheProject();
      // this.props.history.push('/projects');    
      // after submitting the form, we could also redirect to '/projects'
    })
     .catch( (err) => console.log(err) )
  }

  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
    //                ▲  Assign value to property using "object bracket notataion"
    //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
  }
  componentDidMount(){                                    
    this.getSingleProject();
  }


  getSingleProject = () => {                           
    const { id } = this.props.match.params;

    axios.get("http://"+SERVER_HOST+":"+SERVER_PORT+"/api/projects/"+id)
      .then( (apiResponse) =>{
        const theProject = apiResponse.data;
        const { title, description, tasks } = theProject;
        this.setState( { title, description, tasks } );
      })
      .catch((err) => console.log(err));
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          
          <label>Title:</label>
          <input type="text"
            name="title" 
            value={this.state.title} 
            onChange={this.handleChange}/>
          
          <label>Description:</label>    
          <textarea 
            name="description" 
            value={this.state.description} 
            onChange={this.handleChange} 
          />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

// By wrapping EditProject in withRouter, we inject react-router props (match, location, history)
// to the component that help us to get value from the URL (this.props.match.params)
export default withRouter(EditProject);