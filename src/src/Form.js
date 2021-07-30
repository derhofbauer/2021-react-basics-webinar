import './Form.css'
import { useRef, useState } from 'react'
import Task from './Task'
import usePersistentState from './hooks/usePersistentState'

function Form () {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [forceRerender, setForceRerender] = useState(true)

  const [tasks, setTasks] = usePersistentState('tasks', [])
  const [nextId, setNextId] = usePersistentState('nextId', 1)

  const titleRef = useRef(null)

  const onSubmit = (event) => {
    event.preventDefault()

    if (title.length) {
      const _tasks = tasks
      _tasks.push({ title, desc, done: false, id: nextId })
      setTasks(_tasks)
      setNextId(nextId + 1)

      setTitle('')
      setDesc('')
    }

    titleRef.current.focus()
  }

  const onCheckboxClick = (id) => {
    const _tasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done
      }
      return task
    })

    setTasks(_tasks)
  }

  const onDelete = (id) => {
    const _tasks = tasks.filter((task) => {
      return (task.id !== id)
    })

    setTasks(_tasks)

    if (_tasks.length === 0) {
      setNextId(1)
    }
  }

  /**
   * @todo: Some bug :(
   */
  const onUp = (id) => {
    const _tasks = tasks.sort((taskA, taskB) => {
      if (taskA !== null && taskB.id === id) {
        return -1
      }
      return 0
    })

    setTasks(_tasks)
    setForceRerender(!forceRerender)
  }

  /**
   * @todo: Some bug :(
   */
  const onDown = (id) => {
    const _tasks = tasks.sort((taskA, taskB) => {
      if (taskB !== null && taskA.id === id) {
        return 1
      }
      return 0
    })

    setTasks(_tasks)
    setForceRerender(!forceRerender)
  }

  return (
    <>
      <form className="Form" action="/foobar" onSubmit={onSubmit}>
        <div className="Form-group">
          <label htmlFor="title" className="Form-label">Task</label>
          <input type="text" className="Form-control" id="title" name="title" value={title} onChange={(event) => setTitle(
            event.target.value)} ref={titleRef} />
        </div>

        <div className="Form-group">
          <label htmlFor="description" className="Form-label">Beschreibung</label>
          <textarea className="Form-control" id="description" name="description" value={desc} onChange={(event) => setDesc(
            event.target.value)} />
        </div>

        <button className="Form-button">Hinzufügen</button>
      </form>

      <div className="List">
        {tasks.map((task) => (
          <Task
            {...task}
            callback={onCheckboxClick}
            onDelete={onDelete}
            onUp={onUp}
            onDown={onDown}
            key={task.id}
          />
        ))}
      </div>
    </>
  )

}

export default Form
