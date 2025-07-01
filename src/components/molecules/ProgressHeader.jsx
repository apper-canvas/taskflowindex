import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const ProgressHeader = ({ 
  totalTasks = 0, 
  completedTasks = 0, 
  todayTasks = 0, 
  className = '' 
}) => {
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  const todayCompletionPercentage = todayTasks > 0 ? Math.round((completedTasks / todayTasks) * 100) : 0

  const circumference = 2 * Math.PI * 20
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference

  return (
    <div className={`bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 text-white ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="20"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="4"
                fill="none"
              />
              <motion.circle
                cx="22"
                cy="22"
                r="20"
                stroke="white"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold font-display">
                {completionPercentage}%
              </span>
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold font-display mb-2">
              Good morning! 👋
            </h1>
            <p className="text-white/80 font-body">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm mb-2">
              <ApperIcon name="CheckCircle" size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold font-display">{completedTasks}</div>
            <div className="text-xs text-white/80 font-body">Completed</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm mb-2">
              <ApperIcon name="Clock" size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold font-display">{totalTasks - completedTasks}</div>
            <div className="text-xs text-white/80 font-body">Remaining</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm mb-2">
              <ApperIcon name="Target" size={24} className="text-white" />
            </div>
            <div className="text-2xl font-bold font-display">{todayTasks}</div>
            <div className="text-xs text-white/80 font-body">Today</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressHeader