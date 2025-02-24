import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ArrowLeft, BookOpen, Star, Clock, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import ReviewSession from './ReviewSession'

interface Category {
  icon: React.ElementType
  name: string
}

interface CategoryDetailProps {
  category: Category
  onBack: () => void
}

const CategoryDetail = ({ category, onBack }: CategoryDetailProps) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  // Mock data - will be replaced with real data later
  const topics = [
    {
      id: 1,
      title: 'Basic Concepts',
      progress: 85,
      lastReviewed: '2 days ago',
      nextReview: '3 days',
      difficulty: 'Easy',
      status: 'Mastered',
    },
    {
      id: 2,
      title: 'Advanced Topics',
      progress: 45,
      lastReviewed: '1 day ago',
      nextReview: '1 day',
      difficulty: 'Hard',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Common Patterns',
      progress: 60,
      lastReviewed: '5 days ago',
      nextReview: 'Today',
      difficulty: 'Medium',
      status: 'Review Needed',
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-600 bg-green-50'
      case 'medium':
        return 'text-orange-600 bg-orange-50'
      case 'hard':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'mastered':
        return 'text-green-600 bg-green-50'
      case 'in progress':
        return 'text-blue-600 bg-blue-50'
      case 'review needed':
        return 'text-orange-600 bg-orange-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  // If a topic is selected for review, show the review session
  if (selectedTopic) {
    return (
      <ReviewSession
        topicTitle={selectedTopic}
        onBack={() => setSelectedTopic(null)}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className='p-6 max-w-7xl mx-auto'
    >
      <button
        onClick={onBack}
        className='flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6'
      >
        <ArrowLeft className='h-5 w-5' />
        Back to Dashboard
      </button>

      <div className='flex items-center gap-4 mb-8'>
        <category.icon className='h-12 w-12 text-blue-500' />
        <div>
          <h1 className='text-3xl font-bold'>{category.name}</h1>
          <p className='text-gray-500'>{topics.length} topics</p>
        </div>
      </div>

      <div className='grid gap-6'>
        {topics.map((topic, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={topic.id}
          >
            <Card className='hover:shadow-lg transition-shadow'>
              <CardContent className='pt-6'>
                <div className='flex flex-col gap-4'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <h3 className='text-xl font-semibold'>{topic.title}</h3>
                      <div className='flex gap-2 mt-2'>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${getDifficultyColor(
                            topic.difficulty
                          )}`}
                        >
                          {topic.difficulty}
                        </span>
                        <span
                          className={`text-sm px-2 py-1 rounded-full ${getStatusColor(
                            topic.status
                          )}`}
                        >
                          {topic.status}
                        </span>
                      </div>
                    </div>
                    <div className='h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center'>
                      <span className='text-blue-600 font-semibold'>
                        {topic.progress}%
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                    <div className='flex items-center gap-2'>
                      <Clock className='h-5 w-5 text-gray-400' />
                      <span className='text-sm text-gray-600'>
                        Last reviewed: {topic.lastReviewed}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <TrendingUp className='h-5 w-5 text-gray-400' />
                      <span className='text-sm text-gray-600'>
                        Next review: {topic.nextReview}
                      </span>
                    </div>
                  </div>

                  <button
                    className='w-full mt-4 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors'
                    onClick={() => setSelectedTopic(topic.title)}
                  >
                    Start Review
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default CategoryDetail
