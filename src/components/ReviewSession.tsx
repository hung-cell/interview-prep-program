import React, { useState } from 'react'
import { Card, CardContent } from './ui/card'
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react'
import { motion } from 'framer-motion'

interface ReviewSessionProps {
  topicTitle: string
  onBack: () => void
}

const ReviewSession = ({ topicTitle, onBack }: ReviewSessionProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Mock questions - replace with real data later
  const questions = [
    {
      id: 1,
      question: 'What is the main concept behind this topic?',
      answer: 'This is the explanation of the main concept...',
      hints: ['Think about the basics', 'Consider the use cases'],
    },
    {
      id: 2,
      question: 'How would you implement this in a real scenario?',
      answer: 'The implementation would involve...',
      hints: ['Start with the requirements', 'Consider edge cases'],
    },
  ]

  const currentQuestion = questions[currentQuestionIndex]
  const [showAnswer, setShowAnswer] = useState(false)
  const [showHints, setShowHints] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='p-6 max-w-3xl mx-auto'
    >
      <button
        onClick={onBack}
        className='flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6'
      >
        <ArrowLeft className='h-5 w-5' />
        Back to Topic
      </button>

      <h1 className='text-2xl font-bold mb-8'>Reviewing: {topicTitle}</h1>

      <Card className='mb-6'>
        <CardContent className='pt-6'>
          <div className='space-y-6'>
            <div className='flex justify-between text-sm text-gray-500'>
              <span>
                Question {currentQuestionIndex + 1}/{questions.length}
              </span>
              <span>
                Progress:{' '}
                {Math.round(
                  ((currentQuestionIndex + 1) / questions.length) * 100
                )}
                %
              </span>
            </div>

            <h2 className='text-xl font-semibold'>
              {currentQuestion.question}
            </h2>

            <div className='space-y-4'>
              <button
                className='w-full text-left p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100'
                onClick={() => setShowHints(!showHints)}
              >
                Show Hints
              </button>

              {showHints && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='list-disc ml-6 text-gray-600 space-y-2'
                >
                  {currentQuestion.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </motion.ul>
              )}

              <button
                className='w-full text-left p-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100'
                onClick={() => setShowAnswer(!showAnswer)}
              >
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </button>

              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='p-4 bg-gray-50 rounded-lg'
                >
                  {currentQuestion.answer}
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='flex justify-between'>
        <button
          onClick={() => {
            setCurrentQuestionIndex((prev) => prev - 1)
            setShowAnswer(false)
            setShowHints(false)
          }}
          disabled={currentQuestionIndex === 0}
          className='flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 disabled:opacity-50'
        >
          <ChevronLeft className='h-5 w-5' />
          Previous
        </button>

        <button
          onClick={() => {
            setCurrentQuestionIndex((prev) => prev + 1)
            setShowAnswer(false)
            setShowHints(false)
          }}
          disabled={currentQuestionIndex === questions.length - 1}
          className='flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50'
        >
          Next
          <ChevronRight className='h-5 w-5' />
        </button>
      </div>
    </motion.div>
  )
}

export default ReviewSession
