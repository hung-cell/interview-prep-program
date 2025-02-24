import { BookOpen, Brain, Database, Code } from 'lucide-react'

export const categories = [
  { id: 1, name: 'Technical', icon: Code, count: 25, progress: 65 },
  { id: 2, name: 'Behavioral', icon: Brain, count: 15, progress: 45 },
  { id: 3, name: 'Technologies', icon: Database, count: 30, progress: 30 },
  { id: 4, name: 'Problem Solving', icon: BookOpen, count: 20, progress: 55 },
]

export const upcomingReviews = [
  {
    id: 1,
    topic: 'Kafka Architecture',
    category: 'Technologies',
    dueIn: '2 hours',
  },
  {
    id: 2,
    topic: 'System Design Basics',
    category: 'Technical',
    dueIn: '4 hours',
  },
  {
    id: 3,
    topic: 'Leadership Experience',
    category: 'Behavioral',
    dueIn: '1 day',
  },
]

export const recentProgress = [
  {
    id: 1,
    topic: 'Database Indexing',
    category: 'Technical',
    status: 'Mastered',
  },
  {
    id: 2,
    topic: 'Team Conflicts',
    category: 'Behavioral',
    status: 'In Progress',
  },
  {
    id: 3,
    topic: 'Elasticsearch',
    category: 'Technologies',
    status: 'Started',
  },
]
