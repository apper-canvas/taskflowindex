import { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import CategoryCard from '@/components/molecules/CategoryCard'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { categoryService } from '@/services/api/categoryService'
import { taskService } from '@/services/api/taskService'

const CategorySidebar = ({ onAddCategory, className = '' }) => {
  const [categories, setCategories] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { categoryId } = useParams()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const [categoriesData, tasksData] = await Promise.all([
        categoryService.getAll(),
        taskService.getAll()
      ])
      setCategories(categoriesData)
      setTasks(tasksData)
    } catch (err) {
      setError('Failed to load categories')
      console.error('Error loading categories:', err)
    } finally {
      setLoading(false)
    }
  }

  const getTaskCount = (categoryIdToCount) => {
    return tasks.filter(task => task.categoryId === categoryIdToCount.toString()).length
  }

  const getTotalTasks = () => tasks.length
  const getCompletedTasks = () => tasks.filter(task => task.completed).length

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadData} />

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 font-display">
          Categories
        </h2>
        <Button
          variant="ghost"
          size="sm"
          icon="Plus"
          onClick={onAddCategory}
        >
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {/* All Tasks Overview */}
        <NavLink
          to="/"
          className={({ isActive }) => `
            block w-full text-left transition-all duration-200 rounded-lg
            ${isActive ? 'bg-primary/10' : 'hover:bg-gray-50'}
          `}
        >
          <motion.div
            whileHover={{ x: 4 }}
            className="flex items-center justify-between p-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                <ApperIcon name="CheckSquare" size={16} className="text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900 font-body">
                  All Tasks
                </div>
                <div className="text-xs text-gray-500 font-body">
                  {getCompletedTasks()} of {getTotalTasks()} completed
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-body">
                {getTotalTasks()}
              </span>
              <ApperIcon name="ChevronRight" size={14} className="text-gray-400" />
            </div>
          </motion.div>
        </NavLink>

        <div className="border-t border-gray-100 my-4" />

        {/* Category List */}
        {categories.map((category) => (
          <CategoryCard
            key={category.Id}
            category={category}
            taskCount={getTaskCount(category.Id)}
            isActive={categoryId === category.Id.toString()}
          />
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-8">
          <ApperIcon name="FolderOpen" size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-body mb-4">
            No categories yet
          </p>
          <Button
            variant="primary"
            size="sm"
            icon="Plus"
            onClick={onAddCategory}
          >
            Create Category
          </Button>
        </div>
      )}
    </div>
  )
}

export default CategorySidebar