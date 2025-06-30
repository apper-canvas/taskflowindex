import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { categoryService } from '@/services/api/categoryService'
import { toast } from 'react-toastify'

const CategoryModal = ({ 
  isOpen, 
  onClose, 
  category = null, 
  onCategorySaved,
  className = '' 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    color: '#5B47E0'
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const colorOptions = [
    '#5B47E0', '#FF6B6B', '#4ECDC4', '#FFD93D', '#9B59B6',
    '#E67E22', '#2ECC71', '#3498DB', '#E74C3C', '#F39C12'
  ]

  useEffect(() => {
    if (isOpen) {
      if (category) {
        setFormData({
          name: category.name || '',
          color: category.color || '#5B47E0'
        })
      } else {
        setFormData({
          name: '',
          color: '#5B47E0'
        })
      }
      setErrors({})
    }
  }, [isOpen, category])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      setLoading(true)
      
      const categoryData = {
        ...formData,
        name: formData.name.trim()
      }
      
      if (category) {
        await categoryService.update(category.Id, categoryData)
        toast.success('Category updated successfully')
      } else {
        await categoryService.create(categoryData)
        toast.success('Category created successfully')
      }
      
      onCategorySaved?.()
      onClose()
    } catch (err) {
      toast.error(category ? 'Failed to update category' : 'Failed to create category')
      console.error('Error saving category:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`bg-white rounded-xl shadow-xl border border-gray-100 w-full max-w-md ${className}`}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 font-display">
                {category ? 'Edit Category' : 'Create New Category'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                icon="X"
                onClick={onClose}
              />
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <Input
                label="Category Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                placeholder="Enter category name..."
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 font-body">
                  Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleChange('color', color)}
                      className={`
                        w-8 h-8 rounded-full transition-all duration-200
                        ${formData.color === color 
                          ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' 
                          : 'hover:scale-110'
                        }
                      `}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  disabled={loading}
                >
                  {category ? 'Update Category' : 'Create Category'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CategoryModal