// Initialize ApperClient with Project ID and Public Key
const { ApperClient } = window.ApperSDK
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
})

export const categoryService = {
  async getAll() {
    try {
      const params = {
        fields: [
          {
            field: {
              Name: "Name"
            }
          },
          {
            field: {
              Name: "color"
            }
          },
          {
            field: {
              Name: "task_count"
            }
          }
        ],
        orderBy: [
          {
            fieldName: "Name",
            sorttype: "ASC"
          }
        ]
      }

      const response = await apperClient.fetchRecords('category', params)
      
      if (!response.success) {
        console.error('Error fetching categories:', response.message)
        throw new Error(response.message)
      }

      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error('Error fetching categories:', error?.response?.data?.message)
      } else {
        console.error('Error fetching categories:', error.message)
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
              Name: "Name"
            }
          },
          {
            field: {
              Name: "color"
            }
          },
          {
            field: {
              Name: "task_count"
            }
          }
        ]
      }

      const response = await apperClient.getRecordById('category', parseInt(id), params)
      
      if (!response.success) {
        console.error(`Error fetching category with ID ${id}:`, response.message)
        throw new Error(response.message)
      }

      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching category with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(`Error fetching category with ID ${id}:`, error.message)
      }
      throw error
    }
  },

  async create(categoryData) {
    try {
      const params = {
        records: [{
          Name: categoryData.name,
          color: categoryData.color
        }]
      }

      const response = await apperClient.createRecord('category', params)
      
      if (!response.success) {
        console.error('Error creating category:', response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} categories:${JSON.stringify(failedRecords)}`)
          throw new Error('Failed to create category')
        }
        
        return successfulRecords[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error('Error creating category:', error?.response?.data?.message)
      } else {
        console.error('Error creating category:', error.message)
      }
      throw error
    }
  },

  async update(id, categoryData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: categoryData.name,
          color: categoryData.color
        }]
      }

      const response = await apperClient.updateRecord('category', params)
      
      if (!response.success) {
        console.error('Error updating category:', response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} categories:${JSON.stringify(failedUpdates)}`)
          throw new Error('Failed to update category')
        }
        
        return successfulUpdates[0]?.data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error('Error updating category:', error?.response?.data?.message)
      } else {
        console.error('Error updating category:', error.message)
      }
      throw error
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      }

      const response = await apperClient.deleteRecord('category', params)
      
      if (!response.success) {
        console.error('Error deleting category:', response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} categories:${JSON.stringify(failedDeletions)}`)
          throw new Error('Failed to delete category')
        }
        
        return successfulDeletions.length > 0
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error('Error deleting category:', error?.response?.data?.message)
      } else {
        console.error('Error deleting category:', error.message)
      }
      throw error
    }
  }
}