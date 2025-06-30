import { useState } from 'react'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ onSearch, placeholder = "Search tasks...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }

  const clearSearch = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" size={16} className="text-gray-400" />
      </div>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder}
        className="pl-10 pr-10"
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
        >
          <ApperIcon name="X" size={16} className="text-gray-400" />
        </button>
      )}
    </div>
  )
}

export default SearchBar