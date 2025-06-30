import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import Checkbox from '@/components/atoms/Checkbox'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const TaskCard = ({ 
  task, 
  category,
  onToggleComplete, 
  onEdit, 
  onDelete,
  className = '',
  ...props 
}) => {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleToggleComplete = () => {
    if (!task.completed) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1000)
    }
    onToggleComplete(task.Id)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'success'
      case 'medium': return 'warning'
      case 'high': return 'accent'
      case 'urgent': return 'error'
      default: return 'default'
    }
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'low': return 'priority-low'
      case 'medium': return 'priority-medium'
      case 'high': return 'priority-high'
      case 'urgent': return 'priority-urgent'
      default: return ''
    }
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}
      className={`
        bg-white rounded-xl p-4 shadow-sm border border-gray-100 
        hover:shadow-md transition-all duration-200 relative
        ${getPriorityClass(task.priority)}
        ${task.completed ? 'opacity-75' : ''}
        ${className}
      `}
      {...props}
    >
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="confetti-particle"
              style={{
                left: `${20 + i * 20}%`,
                top: '50%',
              }}
            />
          ))}
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            size="md"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className={`
                font-semibold text-gray-900 font-body
                ${task.completed ? 'line-through text-gray-500' : ''}
              `}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`
                  text-sm text-gray-600 mt-1 font-body
                  ${task.completed ? 'line-through text-gray-400' : ''}
                `}>
                  {task.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                icon="Edit"
                onClick={() => onEdit(task)}
                className="opacity-0 group-hover:opacity-100"
              />
              <Button
                variant="ghost"
                size="sm"
                icon="Trash2"
                onClick={() => onDelete(task.Id)}
                className="opacity-0 group-hover:opacity-100 text-error hover:text-error"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Badge variant={getPriorityColor(task.priority)} size="sm">
                {task.priority}
              </Badge>
              
              {category && (
                <Badge 
                  variant="default" 
                  size="sm"
                  className="text-xs"
                  style={{ 
                    backgroundColor: `${category.color}20`,
                    color: category.color
                  }}
                >
                  {category.name}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-gray-500">
              {task.dueDate && (
                <div className={`flex items-center gap-1 ${isOverdue ? 'text-error' : ''}`}>
                  <ApperIcon name="Calendar" size={12} />
                  <span className="font-body">
                    {format(new Date(task.dueDate), 'MMM dd')}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <ApperIcon name="Clock" size={12} />
                <span className="font-body">
                  {format(new Date(task.createdAt), 'MMM dd')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard