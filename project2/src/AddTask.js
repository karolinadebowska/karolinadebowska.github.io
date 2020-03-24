import React from 'react';
import './AddTask.css';
class AddTask extends React.Component {
  state = { newTask: '',
          newType:'task'}

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.newTask,this.state.newType);
    this.setState({ newTask: '' })
  }

  render() {
    return (
      <form className="task-input form-group" onSubmit={this.onFormSubmit}>
        <input type="text" required className="form-control" placeholder="Enter a new task"
               name="newTask"
               value={this.state.newTask}
               onChange={(e) => this.setState({ newTask: e.target.value })} />
               <br/>
        <input type="radio" id="task" name="type" value='task'checked="true"
        onChange={() => this.setState({ newType: 'task'})}/>
  <label for="task"><h4>task</h4></label>
  <input type="radio" id="feature" name="type" value='feature'
  onChange={() => this.setState({ newType: 'feature'})}/>
<label for="feature"><h4>feature</h4></label>
      </form>
    );
  }
}

export default AddTask;
