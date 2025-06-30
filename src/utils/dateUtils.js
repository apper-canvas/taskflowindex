import { format, isToday, isTomorrow, isYesterday, parseISO } from 'date-fns'

export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  if (!date) return ''
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, formatString)
  } catch (error) {
    console.error('Error formatting date:', error)
    return ''
  }
}

export const formatRelativeDate = (date) => {
  if (!date) return ''
  
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    
    if (isToday(dateObj)) return 'Today'
    if (isTomorrow(dateObj)) return 'Tomorrow'
    if (isYesterday(dateObj)) return 'Yesterday'
    
    return format(dateObj, 'MMM dd')
  } catch (error) {
    console.error('Error formatting relative date:', error)
    return ''
  }
}

export const isOverdue = (dueDate, completed = false) => {
  if (!dueDate || completed) return false
  
  try {
    const dateObj = typeof dueDate === 'string' ? parseISO(dueDate) : dueDate
    return dateObj < new Date()
  } catch (error) {
    console.error('Error checking overdue status:', error)
    return false
  }
}

export const sortByDate = (items, dateField = 'createdAt', ascending = true) => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[dateField])
    const dateB = new Date(b[dateField])
    
    if (ascending) {
      return dateA - dateB
    } else {
      return dateB - dateA
    }
  })
}