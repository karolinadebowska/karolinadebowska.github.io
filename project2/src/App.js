import React from 'react';
import axios from 'axios';
import './App.css';
import TaskList from './TaskList';
import AddTask from './AddTask';
class App extends React.Component {
  state = {
    tasks: [],
    errorMessage: '',
    length:0
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get('http://my-json-server.typicode.com/bnissen24/project2DB/posts')
      .then(response => {
        this.setState({ tasks: response.data });
        this.state.length = this.state.tasks.length;
      }).catch(error => {
        this.setState({ errorMessage: error.message });
      });
  }
  onAddTask = (taskName,taskType) => {
    let tasks = this.state.tasks;
    tasks.push({
      title: taskName,
      id: this.state.length + 1,
      type: taskType,
      column: 'todo'
    });
    this.state.length++;
    this.setState({ tasks });
  }

  onUpdateTaskList = (newTaskList) => {
    this.setState({ tasks: newTaskList });
  }

  render() {
    return (
      <div className="container">
          <AddTask onSubmit={this.onAddTask} />
          <div className="toPosition">
            <h2>My board</h2>
            <TaskList tasks={this.state.tasks} onUpdateTaskList={this.onUpdateTaskList} />
          </div>
      </div>
    );
  }
}

export default App;
