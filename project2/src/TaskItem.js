import React from 'react';
import './TaskItem.css';
const buttonAdjust =(bt,type) => {
  if(type=="markDone"){
    if(bt=='done')
      return '\uD83D\uDDD1'
    else
      return '\u2192'
  }
  else if(type=='markUnDone'){
      if(bt=='todo')
        return '\uD83D\uDDD1'
      else
        return "\u2190"
    }
}
const TaskItem = props => {
  return (
      <li className="list-group-item">
      <div className="row">
        <h3 className="list-group-item-text">{props.task.title}</h3>
        <br />
        <h4 className="list-group-item-text">
        Type: { props.task.type}
        <br />
        ID: { props.task.id}
        </h4>
        </div>
        <div className="row">
        <button type="button"
                onClick={() => props.markDone(props.task)}
                className="btn btn-primary" style={{ float: 'right', position:"relative",top:'-25px'}}>
                  {buttonAdjust(props.task.column,'markDone')}
        </button>
        <button type="button"
                onClick={() => props.markUnDone(props.task)}
                className="btn btn-primary" style={{ float: 'left', position:"relative",top:'-25px'}}>
                  {buttonAdjust(props.task.column,'markUnDone')}
        </button>
        </div>
            </li>
  )
};

export default TaskItem;
