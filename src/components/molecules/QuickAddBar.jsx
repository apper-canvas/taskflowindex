import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'

const QuickAddBar = ({ onAddTask, categories = [], className = '' }) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('medium')
  const [isExpanded, setIsExpanded] = useState(false)

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ]

  const categoryOptions = categories.map(cat => ({
    value: cat.Id.toString(),
    label: cat.name
  }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!taskTitle.trim()) return

    const newTask = {
      title: taskTitle.trim(),
      description: '',
      categoryId: selectedCategory || (categories[0]?.Id.toString() || ''),
      priority: selectedPriority,
      dueDate: null,
      completed: false
    }

    onAddTask(newTask)
    setTaskTitle('')
    setIsExpanded(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
    if (e.key === 'Escape') {
      setIsExpanded(false)
      setTaskTitle('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden ${className}`}
    >
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task..."
              className="border-0 focus:ring-0 text-base"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon="Plus"
            disabled={!taskTitle.trim()}
          >
            Add Task
          </Button>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={categoryOptions}
              placeholder="Select category"
              className="flex-1"
            />
            <Select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              options={priorityOptions}
              className="w-32"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              icon="X"
              onClick={() => {
                setIsExpanded(false)
                setTaskTitle('')
              }}
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default QuickAddBar