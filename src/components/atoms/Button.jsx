import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus-ring'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-lg hover:shadow-primary/25 active:scale-95',
    secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 active:scale-95',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 active:scale-95',
    accent: 'bg-gradient-to-r from-accent to-pink-500 text-white hover:shadow-lg hover:shadow-accent/25 active:scale-95',
    success: 'bg-gradient-to-r from-success to-teal-500 text-white hover:shadow-lg hover:shadow-success/25 active:scale-95'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-lg'
  }
  
  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon 
          name="Loader2" 
          size={iconSizes[size]} 
          className="animate-spin mr-2" 
        />
      )}
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon 
          name={icon} 
          size={iconSizes[size]} 
          className="mr-2" 
        />
      )}
      {children}
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon 
          name={icon} 
          size={iconSizes[size]} 
          className="ml-2" 
        />
      )}
    </motion.button>
  )
}

export default Button