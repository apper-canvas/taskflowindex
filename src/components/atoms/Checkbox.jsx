import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = ({ 
  checked, 
  onChange, 
  label, 
  size = 'md',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  
  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  }

  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
          {...props}
        />
        <motion.div
          animate={{
            backgroundColor: checked ? '#5B47E0' : '#ffffff',
            borderColor: checked ? '#5B47E0' : '#d1d5db',
            scale: checked ? [1, 1.1, 1] : 1
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`
            ${sizes[size]} 
            border-2 rounded-md flex items-center justify-center
            transition-all duration-200
          `}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <ApperIcon 
                name="Check" 
                size={iconSizes[size]} 
                className="text-white" 
              />
            </motion.div>
          )}
        </motion.div>
      </div>
      {label && (
        <span className="ml-2 text-sm text-gray-700 font-body select-none">
          {label}
        </span>
      )}
    </label>
  )
}

export default Checkbox