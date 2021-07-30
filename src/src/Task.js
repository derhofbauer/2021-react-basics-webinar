import './Task.css';

function Task ({ title, desc, done, id, callback, onDelete, onUp, onDown }) {

  return (
    <div className="Task">
      <div className="Task-status">
        <input type="checkbox" checked={done} onChange={(event) => callback(id)} />
      </div>
      <div className="Task-text">
        <div className={"Task-title" + (done ? ' Task-title--done' : '')}>{title}</div>
        <div className="Task-description">{desc}</div>
      </div>
      <div className="Task-buttons">
        <button className="Task-delete" onClick={() => onDelete(id)}>Löschen</button>
        <button className="Task-up" onClick={() => onUp(id)}>Up</button>
        <button className="Task-down" onClick={() => onDown(id)}>Down</button>
      </div>
    </div>
  )

}

export default Task
