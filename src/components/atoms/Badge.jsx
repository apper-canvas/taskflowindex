const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm',
  className = '',
  ...props 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-yellow-800',
    error: 'bg-error/10 text-error',
    accent: 'bg-accent/10 text-accent'
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  }

  return (
    <span 
      className={`
        inline-flex items-center font-medium rounded-full
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge