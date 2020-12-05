// src/pages/ProjectList/ProjectList.js
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';            

import AddProject from './../../components/AddProject/AddProject';
// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, 'src/.env') })
// console.log('PATH', path.resolve(__dirname, 'src/.env') )
// const SERVER_HOST= process.env.SERVER_HOST
// const SERVER_PORT=process.env.SERVER_PORT

const SERVER_HOST="macair"
const SERVER_PORT=5000


class ProjectList extends Component {
	state = { 
    listOfProjects: [] 
  };

  getAllProjects = () =>{
    axios.get("http://"+SERVER_HOST+":"+SERVER_PORT+"/api/projects")
    .then((apiResponse) => {
      this.setState({ listOfProjects: apiResponse.data })
    })
  }

  componentDidMount() {
    this.getAllProjects();
    //  fetch the data from API after the initial render, and save it in the state
  }

  render() {
    const { listOfProjects } = this.state;

    return(
      <div id="project-list">
        <AddProject getData={this.getAllProjects} /> 
        
        <div>
          { 
            listOfProjects.map( (project) => (
              <div key={project._id} className='project'>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                  <p>{project.description} </p>
                </Link>
              </div>
            ))
          }
        </div>

      </div>
    )
  }
}

export default ProjectList;

