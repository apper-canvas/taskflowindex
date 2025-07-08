import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useContext } from 'react'
import { AuthContext } from '@/App'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Layout = () => {
  const { user } = useSelector((state) => state.user)
  const { logout } = useContext(AuthContext)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header with user info and logout */}
        <div className="flex items-center justify-between mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 font-display">TaskFlow</h1>
              <p className="text-sm text-gray-500 font-body">Efficient Task Management</p>
            </div>
          </div>
          
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 font-body">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 font-body">{user.emailAddress}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                icon="LogOut"
                onClick={handleLogout}
                className="text-gray-600 hover:text-error"
              >
                Logout
              </Button>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  )
}

export default Layout