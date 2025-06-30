export const getPriorityWeight = (priority) => {
  const weights = {
    urgent: 4,
    high: 3,
    medium: 2,
    low: 1
  }
  return weights[priority] || 1
}

export const sortTasksByPriority = (tasks, ascending = false) => {
  return [...tasks].sort((a, b) => {
    const weightA = getPriorityWeight(a.priority)
    const weightB = getPriorityWeight(b.priority)
    
    if (ascending) {
      return weightA - weightB
    } else {
      return weightB - weightA
    }
  })
}

export const filterTasksByStatus = (tasks, status) => {
  switch (status) {
    case 'completed':
      return tasks.filter(task => task.completed)
    case 'pending':
      return tasks.filter(task => !task.completed)
    case 'overdue':
      return tasks.filter(task => 
        !task.completed && 
        task.dueDate && 
        new Date(task.dueDate) < new Date()
      )
    default:
      return tasks
  }
}

export const filterTasksByCategory = (tasks, categoryId) => {
  if (!categoryId) return tasks
  return tasks.filter(task => task.categoryId === categoryId.toString())
}

export const searchTasks = (tasks, searchTerm) => {
  if (!searchTerm) return tasks
  
  const term = searchTerm.toLowerCase()
  return tasks.filter(task =>
    task.title.toLowerCase().includes(term) ||
    task.description.toLowerCase().includes(term)
  )
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = total - completed
  const overdue = tasks.filter(task => 
    !task.completed && 
    task.dueDate && 
    new Date(task.dueDate) < new Date()
  ).length
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return {
    total,
    completed,
    pending,
    overdue,
    completionRate
  }
}