import React, { Component } from 'react';
import axios from 'axios';
import EditTask from './../../components/EditTask/EditTask';

// const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, 'src/.env') })
// console.log('PATH', path.resolve(__dirname, 'src/.env') )
// const SERVER_HOST= process.env.SERVER_HOST
// const SERVER_PORT=process.env.SERVER_PORT

const SERVER_HOST="macair"
const SERVER_PORT=5000


class TaskDetails extends Component {
	state = {
    title: "",
    description:"",
    _id:"",
    project: "",
  };

  componentDidMount(){
    this.getTheTask();
  }

  getTheTask = () => {
    const {  taskId } = this.props.match.params;
    // console.log('taskId', taskId)
    axios.get("http://"+SERVER_HOST+":"+SERVER_PORT+"/api/tasks/"+taskId)
    	.then( (apiResponse) => {
        const theTask = apiResponse.data;

        this.setState(theTask);
        console.log('theTask', this.state)
    })
    .catch( (err) => console.log(err))
  }
  deleteTask= () =>{
      const id  = this.state._id;
      const idProject= this.state.project
      axios.delete("http://"+SERVER_HOST+":"+SERVER_PORT+"/api/tasks/"+id)
        .then( () => this.props.history.push('/projects/'+idProject) )	// causes Router URL change
        .catch( (err) => console.log(err));
  }
  render(){
    const {  taskId } = this.props.match.params;
    return(
      <div>
        <h3>TASK DETAILS</h3>
        <h2>{this.state.title}</h2>
        <p>{this.state.description}</p>
        <EditTask taskId={taskId} getTheTask={this.getTheTask} />
        
{/* To go back we use react-router-dom method `history.goBack()` available on `props` object */}
<button onClick={this.props.history.goBack} >Go Back</button>
<button onClick={this.deleteTask} >Delete</button>
      </div>
    )
  }
}

export default TaskDetails;