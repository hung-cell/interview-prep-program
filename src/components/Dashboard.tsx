import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import {
  BookOpen,
  Brain,
  Database,
  Code,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  LucideProps,
} from 'lucide-react'
import { categories, upcomingReviews, recentProgress } from './data/mockData'
import CategoryDetail from './CategoryDetail'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState<{
    id: number
    name: string
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >
    count: number
    progress: number
  } | null>(null)

  if (selectedCategory) {
    return (
      <CategoryDetail
        category={selectedCategory}
        onBack={() => setSelectedCategory(null)}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className='p-6 max-w-7xl mx-auto'
    >
      <h1 className='text-3xl font-bold mb-8'>
        Interview Preparation Dashboard
      </h1>

      {/* Categories Overview */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {categories.map((category, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={category.id}
          >
            <Card
              className='hover:shadow-lg transition-shadow'
              onClick={() => setSelectedCategory(category)}
            >
              <CardContent className='pt-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <category.icon className='h-8 w-8 text-blue-500' />
                    <div>
                      <h3 className='font-semibold'>{category.name}</h3>
                      <p className='text-sm text-gray-500'>
                        {category.count} topics
                      </p>
                    </div>
                  </div>
                  <div className='h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center'>
                    <span className='text-blue-600 font-semibold'>
                      {category.progress}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Upcoming Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Clock className='h-5 w-5 text-orange-500' />
              Upcoming Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {upcomingReviews.map((review) => (
                <div
                  key={review.id}
                  className='flex items-center justify-between p-2 hover:bg-gray-50 rounded'
                >
                  <div>
                    <h4 className='font-medium'>{review.topic}</h4>
                    <p className='text-sm text-gray-500'>{review.category}</p>
                  </div>
                  <span className='text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-full'>
                    Due in {review.dueIn}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Progress */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5 text-green-500' />
              Recent Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentProgress.map((progress) => (
                <div
                  key={progress.id}
                  className='flex items-center justify-between p-2 hover:bg-gray-50 rounded'
                >
                  <div>
                    <h4 className='font-medium'>{progress.topic}</h4>
                    <p className='text-sm text-gray-500'>{progress.category}</p>
                  </div>
                  <span
                    className={`text-sm px-3 py-1 rounded-full ${
                      progress.status === 'Mastered'
                        ? 'text-green-600 bg-green-50'
                        : progress.status === 'In Progress'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 bg-gray-50'
                    }`}
                  >
                    {progress.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}

export default Dashboard
