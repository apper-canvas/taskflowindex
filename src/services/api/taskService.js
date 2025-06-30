import mockTasks from '@/services/mockData/tasks.json'

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Helper function to generate unique ID
const generateId = (existingTasks) => {
  const maxId = existingTasks.reduce((max, task) => Math.max(max, task.Id), 0)
  return maxId + 1
}

// In-memory storage for tasks
let tasks = [...mockTasks]

export const taskService = {
  async getAll() {
    await delay(300)
    return [...tasks]
  },

  async getById(id) {
    await delay(200)
    const task = tasks.find(t => t.Id === parseInt(id))
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    const newTask = {
      Id: generateId(tasks),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    tasks.push(newTask)
    return { ...newTask }
  },

  async update(id, taskData) {
    await delay(350)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    const updatedTask = {
      ...tasks[index],
      ...taskData,
      Id: parseInt(id) // Ensure ID remains unchanged
    }
    
    tasks[index] = updatedTask
    return { ...updatedTask }
  },

  async delete(id) {
    await delay(300)
    const index = tasks.findIndex(t => t.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    const deletedTask = tasks.splice(index, 1)[0]
    return { ...deletedTask }
  }
}