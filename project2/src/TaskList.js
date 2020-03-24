import React from 'react';
import './TaskItem.css';
import './TaskList.css';
import TaskItem from './TaskItem';
  const MOBILE_BREAKPOINT = 768;
  const myArray = [['todo','TO DO'],['in-progress','PROGRESS'],['review','REVIEW'],['done','DONE']];
class TaskList extends React.Component {
  state = {
  view: 'todo',
  activeMenu: 0,
  browserWidth: 0,
  breakpoint: 'mobile'
}
onViewChange(view) {
  this.setState({ view });
  console.log(this.state.view);
}

componentDidMount() {
  window.addEventListener('resize', this.handleResize);
  this.handleResize();
}

handleResize = () => {
   const browserWidth = window.innerWidth;
   let breakpoint = 'mobile';

   if (browserWidth > MOBILE_BREAKPOINT ){
     breakpoint = 'desktop';
   }
   else{
     breakpoint = 'mobile';
   }

   this.setState({ breakpoint, browserWidth });
 }

  markDone = (task) => {
    const taskIndex = this.props.tasks.findIndex(t => t.id === task.id);
    let taskList = this.props.tasks;
    if(task.column=='todo')
      task.column='in-progress';
    else if(task.column=='in-progress')
      task.column='review';
    else if(task.column=='review')
      task.column='done';
    else if (task.column=='done'){
      taskList.splice(taskIndex,1);
    }
    console.log(task,task.column);
    this.props.onUpdateTaskList(taskList);
  }

  markUnDone = (task) => {
    const taskIndex = this.props.tasks.findIndex(t => t.id === task.id);
    let taskList = this.props.tasks;
    if(task.column=='todo')
      taskList.splice(taskIndex,1);
    else if(task.column=='in-progress')
      task.column='todo';
    else if(task.column=='review')
      task.column='in-progress';
    else if (task.column=='done'){
      task.column='review';
    }
    console.log(task,task.column);
    this.props.onUpdateTaskList(taskList);
  }
  render() {
    this.props.tasks.sort((a, b) =>{
        var id_a = a.id;
        var id_b = b.id;
        if (id_a > id_b)
            return -1;
        if (id_a > id_b)
            return 1;
          });

    const filtered = (status) => {
        const list = this.props.tasks.filter((task) => {
          if(task.column==status)
            return task;
        }).map((task) =>{
          return <TaskItem task={task} key={task.id} markDone={this.markDone} markUnDone={this.markUnDone} />
        });
        return list;
      }
    if(this.state.breakpoint==='mobile'){
      return (
        <div>
          <div className="dropdown">
            <button className="dropbtn" onClick={() => this.setState({activeMenu: !this.state.activeMenu})}>{this.state.view}</button>
              <div className="dropdown-content">
                <a className={this.state.activeMenu ? 'itemDrop-active' : 'itemDrop'} href='#'
                onClick={() => this.setState({ view: 'todo',activeMenu: !this.state.activeMenu})}>to do</a>
                <a className={this.state.activeMenu ? 'itemDrop-active' : 'itemDrop'} href='#'
                onClick={() => this.setState({ view: 'in-progress',activeMenu: !this.state.activeMenu})}>in progress</a>
                <a className={this.state.activeMenu ? 'itemDrop-active' : 'itemDrop'} href='#'
                onClick={() => this.setState({ view: 'review',activeMenu: !this.state.activeMenu})}>review</a>
                <a className={this.state.activeMenu ? 'itemDrop-active' : 'itemDrop'} href='#'
                onClick={() => this.setState({ view: 'done',activeMenu: !this.state.activeMenu})}>done</a>
              </div>
          </div>
          <ul className="col-sm-3">
            {filtered(this.state.view)}
          </ul>
        </div>
      )
    }
    else {
      return(
        <div>
          {myArray.map((element)=> {
            return(
                <ul className="col-sm-3">
                  <div style = {{display:"inline-block"}}>
                    <h1>{element[1]} </h1>
                  </div>
                  {filtered(element[0])}
                </ul>
            )
          })}
        </div>
      )}
    }
}
export default TaskList;
