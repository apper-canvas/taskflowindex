import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = 'Something went wrong',
  onRetry,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`bg-white rounded-xl shadow-sm border border-red-100 p-8 text-center ${className}`}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
          <ApperIcon 
            name="AlertCircle" 
            size={32} 
            className="text-white" 
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 font-display mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 font-body max-w-md">
            {message}
          </p>
        </div>
        
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            icon="RefreshCw"
            className="mt-4"
          >
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default Error