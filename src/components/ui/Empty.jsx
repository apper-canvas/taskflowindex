import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  icon = 'FileText',
  title = 'No data found',
  description = 'Get started by creating your first item',
  actionLabel = 'Get Started',
  onAction,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`text-center py-12 px-6 ${className}`}
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center">
          <ApperIcon 
            name={icon} 
            size={40} 
            className="text-white" 
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 font-display">
            {title}
          </h3>
          <p className="text-gray-600 font-body max-w-md">
            {description}
          </p>
        </div>
        
        {onAction && (
          <Button
            onClick={onAction}
            variant="primary"
            icon="Plus"
            className="mt-6"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default Empty