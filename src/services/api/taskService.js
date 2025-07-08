// Initialize ApperClient with Project ID and Public Key
const { ApperClient } = window.ApperSDK
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
})

export const taskService = {
  async getAll() {
    try {
      const params = {
        fields: [
          {
            field: {
              Name: "title"
            }
          },
          {
            field: {
              Name: "description"
            }
          },
          {
            field: {
              Name: "category_id"
            }
          },
          {
            field: {
              Name: "priority"
            }
          },
          {
            field: {
              Name: "due_date"
            }
          },
          {
            field: {
              Name: "completed"
            }
          },
          {
            field: {
              Name: "created_at"
            }
          },
          {
            field: {
              Name: "completed_at"
            }
          }
        ],
        orderBy: [
          {
            fieldName: "created_at",
            sorttype: "DESC"
          }
        ]
      }

      const response = await apperClient.fetchRecords('task', params)
      
      if (!response.success) {
        console.error('Error fetching tasks:', response.message)
        throw new Error(response.message)
      }

      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error('Error fetching tasks:', error?.response?.data?.message)
      } else {
        console.error('Error fetching tasks:', error.message)
      }
      throw error
    }
  },

  async getById(id) {
    try {
      const params = {
        fields: [
          {
            field: {
              Name: "title"
            }
          },
          {
            field: {
              Name: "description"
            }
          },
          {
            field: {
              Name: "category_id"
            }
          },
          {
            field: {
              Name: "priority"
            }
          },
          {
            field: {
              Name: "due_date"
            }
          },
          {
            field: {
              Name: "completed"
            }
          },
          {
            field: {
              Name: "created_at"
            }
          },
          {
            field: {
              Name: "completed_at"
            }
          }
        ]
      }

      const response = await apperClient.getRecordById('task', parseInt(id), params)
      
      if (!response.success) {
        console.error(`Error fetching task with ID ${id}:`, response.message)
        throw new Error(response.message)
      }

      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(`Error fetching task with ID ${id}:`, error.message)
      }
      throw error
    }
  },

  async create(taskData) {
    try {
      const params = {
        records: [{
          title: taskData.title,
          description: taskData.description || '',
          category_id: parseInt(taskData.categoryId),
          priority: taskData.priority,
          due_date: taskData.dueDate || null,
          completed: false,
          created_at: new Date().toISOString()
        }]
      }

      const response = await apperClient.createRecord('task', params)
      
      if (!response.success) {
        console.error('Error creating task:', response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} tasks:${JSON.stringify(failedRecords)}`)
          throw new Error('Failed to create task')
        }
        
        return successfulRecords[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error('Error creating task:', error?.response?.data?.message)
      } else {
        console.error('Error creating task:', error.message)
      }
      throw error
    }
  },

  async update(id, taskData) {
    try {
      const updateData = {
        Id: parseInt(id)
      }

      // Only include fields that are provided
      if (taskData.title !== undefined) updateData.title = taskData.title
      if (taskData.description !== undefined) updateData.description = taskData.description
      if (taskData.categoryId !== undefined) updateData.category_id = parseInt(taskData.categoryId)
      if (taskData.priority !== undefined) updateData.priority = taskData.priority
      if (taskData.dueDate !== undefined) updateData.due_date = taskData.dueDate
      if (taskData.completed !== undefined) updateData.completed = taskData.completed
      if (taskData.completedAt !== undefined) updateData.completed_at = taskData.completedAt

      const params = {
        records: [updateData]
      }

      const response = await apperClient.updateRecord('task', params)
      
      if (!response.success) {
        console.error('Error updating task:', response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} tasks:${JSON.stringify(failedUpdates)}`)
          throw new Error('Failed to update task')
        }
        
        return successfulUpdates[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error('Error updating task:', error?.response?.data?.message)
      } else {
        console.error('Error updating task:', error.message)
      }
      throw error
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      }

      const response = await apperClient.deleteRecord('task', params)
      
      if (!response.success) {
        console.error('Error deleting task:', response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} tasks:${JSON.stringify(failedDeletions)}`)
          throw new Error('Failed to delete task')
        }
        
        return successfulDeletions.length > 0
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error('Error deleting task:', error?.response?.data?.message)
      } else {
        console.error('Error deleting task:', error.message)
      }
      throw error
    }
  }
}