import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Textarea from '@/components/atoms/Textarea'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'
import { taskService } from '@/services/api/taskService'
import { categoryService } from '@/services/api/categoryService'
import { toast } from 'react-toastify'

const TaskModal = ({ 
  isOpen, 
  onClose, 
  task = null, 
  onTaskSaved,
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    priority: 'medium',
    dueDate: ''
  })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isOpen) {
      loadCategories()
      if (task) {
        setFormData({
          title: task.title || '',
          description: task.description || '',
          categoryId: task.categoryId || '',
          priority: task.priority || 'medium',
          dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
        })
      } else {
        setFormData({
          title: '',
          description: '',
          categoryId: '',
          priority: 'medium',
          dueDate: ''
        })
      }
      setErrors({})
    }
  }, [isOpen, task])

  const loadCategories = async () => {
    try {
      const categoriesData = await categoryService.getAll()
      setCategories(categoriesData)
      if (!task && categoriesData.length > 0) {
        setFormData(prev => ({ ...prev, categoryId: categoriesData[0].Id.toString() }))
      }
    } catch (err) {
      console.error('Error loading categories:', err)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      setLoading(true)
      
      const taskData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
      }
      
      if (task) {
        await taskService.update(task.Id, taskData)
        toast.success('Task updated successfully')
      } else {
        await taskService.create(taskData)
        toast.success('Task created successfully')
      }
      
      onTaskSaved?.()
      onClose()
    } catch (err) {
      toast.error(task ? 'Failed to update task' : 'Failed to create task')
      console.error('Error saving task:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ]

  const categoryOptions = categories.map(cat => ({
    value: cat.Id.toString(),
    label: cat.name
  }))

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`bg-white rounded-xl shadow-xl border border-gray-100 w-full max-w-lg ${className}`}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 font-display">
                {task ? 'Edit Task' : 'Create New Task'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                icon="X"
                onClick={onClose}
              />
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <Input
                label="Task Title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                error={errors.title}
                placeholder="Enter task title..."
                required
              />

              <Textarea
                label="Description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                error={errors.description}
                placeholder="Add task description..."
                rows={3}
              />

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Category"
                  value={formData.categoryId}
                  onChange={(e) => handleChange('categoryId', e.target.value)}
                  options={categoryOptions}
                  error={errors.categoryId}
                  placeholder="Select category"
                  required
                />

                <Select
                  label="Priority"
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  options={priorityOptions}
                />
              </div>

              <Input
                type="date"
                label="Due Date"
                value={formData.dueDate}
                onChange={(e) => handleChange('dueDate', e.target.value)}
                error={errors.dueDate}
              />

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  disabled={loading}
                >
                  {task ? 'Update Task' : 'Create Task'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default TaskModal