import './App.css';
import { Switch, Route } from 'react-router-dom';
import ProjectList from './pages/ProjectList/ProjectList';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails'; 
import TaskDetails from './pages/TaskDetails/TaskDetails'; 
import Navbar from './components/Navbar/Navbar';
// require("dotenv").config();
// const SERVER_HOST= process.env.SERVER_HOST
// const SERVER_PORT=process.env.SERVER_PORT

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>																												{/* ADD */}
        <Route exact path="/projects" component={ProjectList}/>
        <Route exact path="/projects/:id" component={ProjectDetails} />       {/* ADD */}
        <Route exact path="/tasks/:taskId" component={TaskDetails} />       {/* ADD */}
      </Switch>
    </div>
  );
}

export default App;
