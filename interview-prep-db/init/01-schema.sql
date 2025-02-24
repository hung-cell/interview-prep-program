-- Create enums for difficulty levels
CREATE TYPE difficulty_level AS ENUM ('Easy', 'Medium', 'Hard');

-- Create Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    CONSTRAINT email_valid CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Topics table
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    difficulty_level difficulty_level NOT NULL,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(category_id, name)
);

-- Create Questions table
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    answer TEXT NOT NULL,
    difficulty_level difficulty_level NOT NULL,
    resources TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create UserProgress table
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic_id INTEGER NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
    mastery_level FLOAT NOT NULL DEFAULT 0.0,
    times_reviewed INTEGER NOT NULL DEFAULT 0,
    last_reviewed TIMESTAMP WITH TIME ZONE,
    next_review TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT mastery_level_range CHECK (mastery_level >= 0.0 AND mastery_level <= 100.0),
    UNIQUE(user_id, topic_id)
);

-- Create ReviewHistory table
CREATE TABLE review_history (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    confidence_score INTEGER NOT NULL,
    review_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    time_spent_seconds INTEGER NOT NULL,
    passed BOOLEAN NOT NULL,
    CONSTRAINT confidence_score_range CHECK (confidence_score >= 1 AND confidence_score <= 5)
);

-- Create indexes for better query performance
CREATE INDEX idx_topics_category_id ON topics(category_id);
CREATE INDEX idx_questions_topic_id ON questions(topic_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_topic_id ON user_progress(topic_id);
CREATE INDEX idx_user_progress_next_review ON user_progress(next_review);
CREATE INDEX idx_review_history_user_id ON review_history(user_id);
CREATE INDEX idx_review_history_question_id ON review_history(question_id);
CREATE INDEX idx_review_history_review_date ON review_history(review_date);

-- Insert initial categories
INSERT INTO categories (name, description, icon) VALUES
('Technical', 'Programming and technical interview questions', 'code'),
('Behavioral', 'Soft skills and behavioral questions', 'brain'),
('Technologies', 'Specific technologies and tools', 'database'),
('Problem Solving', 'General problem solving and algorithms', 'book-open');

-- Insert sample topics for Technical category
INSERT INTO topics (category_id, name, description, difficulty_level, order_index) VALUES
(1, 'Data Structures', 'Basic data structures and their implementations', 'Medium', 1),
(1, 'Algorithms', 'Common algorithmic problems and solutions', 'Hard', 2),
(1, 'System Design', 'Designing scalable systems and architecture', 'Hard', 3);

-- Insert sample topics for Behavioral category
INSERT INTO topics (category_id, name, description, difficulty_level, order_index) VALUES
(2, 'Leadership', 'Leadership experience and scenarios', 'Medium', 1),
(2, 'Conflict Resolution', 'Handling workplace conflicts', 'Medium', 2),
(2, 'Team Collaboration', 'Working effectively in teams', 'Easy', 3);

-- Insert sample topics for Technologies category
INSERT INTO topics (category_id, name, description, difficulty_level, order_index) VALUES
(3, 'Kafka', 'Apache Kafka architecture and usage', 'Hard', 1),
(3, 'Elasticsearch', 'Elasticsearch basics and optimization', 'Medium', 2),
(3, 'PostgreSQL', 'PostgreSQL database management', 'Medium', 3);

-- Insert sample questions for Data Structures topic
INSERT INTO questions (topic_id, question_text, answer, difficulty_level) VALUES
(1, 'What is the time complexity of inserting an element into a balanced binary search tree?', 'O(log n) in average and worst case, where n is the number of nodes in the tree.', 'Medium'),
(1, 'Explain the difference between an Array and a LinkedList.', 'Arrays are contiguous memory blocks with constant-time access but linear-time insertion/deletion. LinkedLists have linear-time access but constant-time insertion/deletion at known positions.', 'Easy');

-- Add constraints for data integrity
ALTER TABLE user_progress ADD CONSTRAINT check_review_dates 
    CHECK (next_review >= last_reviewed);

ALTER TABLE review_history ADD CONSTRAINT check_time_spent
    CHECK (time_spent_seconds > 0);

-- Create function to update last_login
CREATE OR REPLACE FUNCTION update_last_login()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_login = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update last_login
CREATE TRIGGER trigger_update_last_login
    BEFORE UPDATE ON users
    FOR EACH ROW
    WHEN (OLD.* IS DISTINCT FROM NEW.*)
    EXECUTE FUNCTION update_last_login();