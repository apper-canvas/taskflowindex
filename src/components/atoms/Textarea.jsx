import { forwardRef } from 'react'

const Textarea = forwardRef(({ 
  label, 
  error, 
  rows = 3,
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
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full px-4 py-2.5 text-sm font-body
          bg-white border border-gray-200 rounded-lg
          focus:outline-none focus:ring-3 focus:ring-primary/20 focus:border-primary
          hover:border-gray-300 
          transition-all duration-200
          placeholder-gray-400
          resize-none
          ${error ? 'border-error focus:ring-error/20 focus:border-error' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error font-body">{error}</p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea