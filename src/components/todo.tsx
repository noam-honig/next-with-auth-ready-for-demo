"use client"
import { FormEvent, useState } from "react"
import { Task } from "../models/Task"

export default function Todo() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState("")

  async function addTask(e: FormEvent) {
    e.preventDefault()
    try {
      const newTask = {
        title: newTaskTitle,
        completed: false,
        createdAt: new Date(),
        id: tasks.length.toString(),
      }
      setTasks([...tasks, newTask])
      setNewTaskTitle("")
    } catch (err: any) {
      alert(err.message)
    }
  }
  async function setCompleted(task: Task, completed: boolean) {
    const updatedTask = { ...task, completed }
    setTasks((tasks) => tasks.map((t) => (t == task ? updatedTask : t)))
  }
  async function deleteTask(task: Task) {
    try {
      setTasks((tasks) => tasks.filter((t) => t !== task))
    } catch (err: any) {
      alert(err.message)
    }
  }
  async function setAllCompleted(completed: boolean) {
    setTasks((tasks) => tasks.map((t) => ({ ...t, completed })))
  }

  return (
    <div>
      <h1>Todos</h1>
      <main>
        <form onSubmit={addTask}>
          <input
            value={newTaskTitle}
            placeholder="What needs to be done?"
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <button>Add</button>
        </form>

        {tasks.map((task) => {
          return (
            <div key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => setCompleted(task, e.target.checked)}
              />
              <span>{task.title}</span>
              <button onClick={() => deleteTask(task)}>Delete</button>
            </div>
          )
        })}
        <div>
          <button onClick={() => setAllCompleted(true)}>
            Set All Completed
          </button>
          <button onClick={() => setAllCompleted(false)}>
            Set All UnCompleted
          </button>
        </div>
      </main>
    </div>
  )
}
