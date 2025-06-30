import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Select = forwardRef(({ 
  label, 
  error, 
  options = [],
  placeholder = 'Select option',
  className = '', 
  containerClassName = '',
  ...props 
}, ref) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2 font-body">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full px-4 py-2.5 text-sm font-body
            bg-white border border-gray-200 rounded-lg
            focus:outline-none focus:ring-3 focus:ring-primary/20 focus:border-primary
            hover:border-gray-300 
            transition-all duration-200
            appearance-none cursor-pointer
            ${error ? 'border-error focus:ring-error/20 focus:border-error' : ''}
            ${className}
          `}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ApperIcon 
          name="ChevronDown" 
          size={16} 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-error font-body">{error}</p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select