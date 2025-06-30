import { useState } from 'react'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'

const FilterBar = ({ 
  onFilterChange, 
  categories = [],
  currentFilters = {},
  className = '' 
}) => {
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    category: '',
    ...currentFilters
  })

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ]

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ]

  const categoryOptions = categories.map(cat => ({
    value: cat.Id.toString(),
    label: cat.name
  }))

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = { priority: '', status: '', category: '' }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '')

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <Select
        value={filters.priority}
        onChange={(e) => handleFilterChange('priority', e.target.value)}
        options={priorityOptions}
        placeholder="All Priorities"
        className="min-w-32"
      />
      
      <Select
        value={filters.status}
        onChange={(e) => handleFilterChange('status', e.target.value)}
        options={statusOptions}
        placeholder="All Tasks"
        className="min-w-32"
      />
      
      <Select
        value={filters.category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
        options={categoryOptions}
        placeholder="All Categories"
        className="min-w-32"
      />
      
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          icon="X"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      )}
    </div>
  )
}

export default FilterBar