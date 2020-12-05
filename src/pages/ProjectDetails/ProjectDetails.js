//  src/pages/ProjectDetails/ProjectDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditProject from './../../components/EditProject/EditProject';

import AddTask from "./../../components/AddTask/AddTask";
// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, 'src/.env') })
// console.log('PATH', path.resolve(__dirname, 'src/.env') )
// const SERVER_HOST= process.env.SERVER_HOST
// const SERVER_PORT=process.env.SERVER_PORT

const SERVER_HOST="macair"
const SERVER_PORT=5000

class ProjectDetails extends Component {
  
  state = {
    _id:"",
    title: " ",
    description: " ",
    tasks: []
  }

  componentDidMount(){                                    
    this.getSingleProject();
  }


  getSingleProject = () => {                           
    const { id } = this.props.match.params;

    axios.get("http://"+SERVER_HOST+":"+SERVER_PORT+"/api/projects/"+id)
      .then( (apiResponse) =>{
        const theProject = apiResponse.data;
        const { _id, title, description, tasks } = theProject;
        this.setState( { _id, title, description, tasks } );
      })
      .catch((err) => console.log(err));
  }

  deleteProject = () => {														// <== CREATE METHOD
    const { id } = this.props.match.params;
    
    axios.delete("http://"+SERVER_HOST+":"+SERVER_PORT+"/api/projects/"+id)
    	.then( () => this.props.history.push('/projects') )	// causes Router URL change
    	.catch( (err) => console.log(err));
  }
  
  render(){
    return (
      <div>
	      <h1>Project Details</h1>

        <h2>{this.state.title}</h2>    
        <h4>{this.state.description}</h4>
        
        <Link to={'/projects'}>        
        	<button>Back</button>
        </Link>


        <EditProject getTheProject={this.getSingleProject} />

        <button onClick={this.deleteProject}>
          Delete project
        </button>

        <AddTask getUpdatedProject={this.getSingleProject} />

        { 
          (this.state.tasks.length === 0) 
            ? <h2>NO TASKS TO DISPLAY</h2>
            : this.state.tasks.map((task) => {
            return(
               <Link 
                 key={task._id}
                 to={`/tasks/${task._id}`}
               >
                
                 <div className="task">
                   <h2>{ task.title }</h2>
                 </div>
                
               </Link>
            )
            
        	})
      	}
      </div>
    )
  }
}

export default ProjectDetails;