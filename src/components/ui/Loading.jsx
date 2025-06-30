import { motion } from 'framer-motion'

const Loading = ({ className = '' }) => {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      {/* Header skeleton */}
      <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-32 rounded-xl shimmer" />
      
      {/* Quick add skeleton */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-12 rounded-lg shimmer" />
      </div>
      
      {/* Main content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar skeleton */}
        <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-6 rounded shimmer" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-gray-200 to-gray-300 w-3 h-3 rounded-full shimmer" />
                  <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-4 flex-1 rounded shimmer" />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Task list skeleton */}
        <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-6 w-48 rounded shimmer" />
            
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-r from-gray-200 to-gray-300 w-5 h-5 rounded-md shimmer" />
                    <div className="flex-1 space-y-2">
                      <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-5 w-3/4 rounded shimmer" />
                      <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-4 w-1/2 rounded shimmer" />
                      <div className="flex items-center gap-2 mt-3">
                        <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-6 w-16 rounded-full shimmer" />
                        <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-6 w-20 rounded-full shimmer" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading