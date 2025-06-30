import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const CategoryCard = ({ 
  category, 
  taskCount = 0, 
  isActive = false,
  className = '',
  ...props 
}) => {
  return (
    <NavLink
      to={`/category/${category.Id}`}
      className={({ isActive: navIsActive }) => `
        block w-full text-left transition-all duration-200
        ${navIsActive || isActive ? 'bg-primary/10' : 'hover:bg-gray-50'}
        ${className}
      `}
      {...props}
    >
      <motion.div
        whileHover={{ x: 4 }}
        className="flex items-center justify-between p-3 rounded-lg"
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }}
          />
          <div>
            <div className="font-medium text-gray-900 font-body">
              {category.name}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 font-body">
            {taskCount}
          </span>
          <ApperIcon name="ChevronRight" size={14} className="text-gray-400" />
        </div>
      </motion.div>
    </NavLink>
  )
}

export default CategoryCard