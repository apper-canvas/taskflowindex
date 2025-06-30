import mockCategories from '@/services/mockData/categories.json'

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Helper function to generate unique ID
const generateId = (existingCategories) => {
  const maxId = existingCategories.reduce((max, category) => Math.max(max, category.Id), 0)
  return maxId + 1
}

// In-memory storage for categories
let categories = [...mockCategories]

export const categoryService = {
  async getAll() {
    await delay(250)
    return [...categories]
  },

  async getById(id) {
    await delay(200)
    const category = categories.find(c => c.Id === parseInt(id))
    if (!category) {
      throw new Error('Category not found')
    }
    return { ...category }
  },

  async create(categoryData) {
    await delay(350)
    const newCategory = {
      Id: generateId(categories),
      ...categoryData,
      taskCount: 0
    }
    categories.push(newCategory)
    return { ...newCategory }
  },

  async update(id, categoryData) {
    await delay(300)
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    const updatedCategory = {
      ...categories[index],
      ...categoryData,
      Id: parseInt(id) // Ensure ID remains unchanged
    }
    
    categories[index] = updatedCategory
    return { ...updatedCategory }
  },

  async delete(id) {
    await delay(300)
    const index = categories.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Category not found')
    }
    
    const deletedCategory = categories.splice(index, 1)[0]
    return { ...deletedCategory }
  }
}