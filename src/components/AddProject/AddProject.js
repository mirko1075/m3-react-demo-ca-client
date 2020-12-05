import React, { Component } from 'react';
import axios from 'axios';
// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, 'src/.env') })
// console.log('PATH', path.resolve(__dirname, 'src/.env') )
// const SERVER_HOST= process.env.SERVER_HOST
// const SERVER_PORT=process.env.SERVER_PORT

const SERVER_HOST="macair"
const SERVER_PORT=5000



class AddProject extends Component {
  constructor(props){
      super(props);
      this.state = { title: "", description: "" };
  }
   
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
 
  
  
  
 handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, description } = this.state;
     console.log('URL', "http://"+SERVER_HOST+":"+SERVER_PORT+"/api/projects")
    axios.post("http://"+SERVER_HOST+":"+SERVER_PORT+"/api/projects", { title, description })
    .then( () => {
      this.props.getData();
      this.setState({title: "", description: ""});
    })
    .catch( (err) => console.log(err) )
  }
  

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          
          <label>Title:</label>
          <input type="text" 
            name="title" 
            value={this.state.title} 
            onChange={ (e) => this.handleChange(e) }
          />
          
          <label>Description:</label>
          <textarea 
            name="description" 
            value={this.state.description} 
            onChange={ (e) => this.handleChange(e) } 
          />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddProject;