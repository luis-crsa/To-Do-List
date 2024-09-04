import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.png'
import api from '../../services/api'

function Home() {
  const [tasks, setTasks] = useState([])

  const inputTitlle = useRef()
  const inputDescription = useRef()

  async function getTasks() {
    const tasksFromApi = await api.get('/tasks')
    setTasks(tasksFromApi.data)
  }

  async function createTasks() {

    await api.post('/tasks', {
      tittle: inputTitlle.current.value,
      description: inputDescription.current.value,
      status: false
    })
    inputTitlle.current.value = ''
    inputDescription.current.value = ''
    getTasks()
  }

  async function deleteTasks(id) {
    await api.delete(`/tasks/${id}`)
    getTasks()
  }

  useEffect(() => {
    getTasks()
  }, [])

  async function taskCompletion(event, task) {
    const cardElement = event.target.closest('.card');

    const newStatus = event.target.checked;

    if (newStatus) {
      cardElement.classList.add('completed');
    } else {
      cardElement.classList.remove('completed');
    }

    await api.put(`/tasks/${task.id}`, {
      status: newStatus,
    });

    getTasks();
  }

  return (
    <div className='container'>
      <form>
        <h1>Lista de tarefas</h1>
        <input placeholder='Tarefa' name='tittle' type='text' ref={inputTitlle} />
        <input placeholder='Descrição' name='description' type='text' ref={inputDescription} />
        <button type='button' onClick={createTasks}>Registrar</button>
      </form>

      {tasks.map(task => (

        <div className={`card ${task.status ? 'completed' : ''}`} key={task.id}>
          <input
            type="checkbox"
            className="complete-checkbox"
            onChange={(event) => taskCompletion(event, task)}
            checked={task.status}
          />
          <div>
            <p><span>{task.tittle}</span></p>
            <p>{task.description}</p>
          </div>
          <button onClick={() => deleteTasks(task.id)}>
            <img src={Trash} />
          </button>
        </div>

      ))}

    </div>
  )
}

export default Home
