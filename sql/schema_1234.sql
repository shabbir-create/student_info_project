
CREATE DATABASE IF NOT EXISTS student_portal_1234;
USE student_portal_1234;

CREATE TABLE IF NOT EXISTS students_1234 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  roll_number VARCHAR(20) NOT NULL UNIQUE,
  course VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL,
  city VARCHAR(80) NOT NULL,
  school VARCHAR(120) NOT NULL,
  year_of_passing INT NOT NULL,
  tenth_percentage DECIMAL(5,2) NOT NULL,
  twelfth_percentage DECIMAL(5,2),
  college VARCHAR(120),
  cgpa DECIMAL(4,2),
  college_start_year INTEGER,
  college_end_year INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS activities_1234 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('Planned', 'In Progress', 'Completed') NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Subject_1234 (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_id INT NOT NULL,
  description VARCHAR(250) NOT NULL,
  subject_name VARCHAR(120) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO students_1234
  (name, roll_number, course, email, city, school, year_of_passing, tenth_percentage, twelfth_percentage, college, cgpa, college_start_year, college_end_year)
VALUES
  ('Shabbir', '24UADS1047', 'Artificial Intelligence and Data Science (AIDS)', 'shabbir6075@gmail.com', 'Pali', 'V.M.S Senior Secondary School', 2022, 89.40, 94, 'MBM University', 8.10, 2024, 2027)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  course = VALUES(course),
  email = VALUES(email),
  city = VALUES(city),
  school = VALUES(school),
  year_of_passing = VALUES(year_of_passing),
  tenth_percentage = VALUES(tenth_percentage),
  twelfth_percentage = VALUES(twelfth_percentage),
  college = VALUES(college),
  cgpa = VALUES(cgpa),
  college_start_year = VALUES(college_start_year),
  college_end_year = VALUES(college_end_year);

INSERT INTO Subject_1234 (course_id, description, subject_name, date) 
VALUES
  (1, 'Data structures and problem solving', 'Data Structures', '2026-01-10'),
  (2, 'Web development with React ecosystem', 'Frontend Engineering', '2026-01-11'),
  (3, 'Database design and SQL operations', 'Database Management', '2026-01-12'),
  (4, 'Introduction to machine learning algorithms and models', 'Machine Learning', '2026-01-13'),
  (5, 'Concepts of process management, memory management, and scheduling', 'Operating Systems', '2026-01-14'),
  (6, 'Software development lifecycle and agile methodologies', 'Software Engineering', '2026-01-17'),
  (7, 'Train feedforward neural networks using backpropagation and study how hidden layers learn representations.', 'Multilayer Perceptrons (MLP)', '2026-11-25'),
  (8, 'Analyze images with convolutional networks, object detection and image segmentation.', 'Computer Vision', '2026-11-25'),
  (9, 'Study how language and diffusion models generate text and images, and evaluate their outputs.', 'Generative AI', '2026-11-25'),
  (10, 'Represent text, build language models and evaluate text classification and retrieval.', 'Natural Language Processing', '2026-11-25'),
  (11, 'Estimate population parameters and test hypotheses using sample data.', 'Statistical Inference', '2026-11-25'),
  (12, 'Discover patterns with clustering, association rules and anomaly detection.', 'Data Mining', '2026-11-25'),
  (13, 'Evaluate fairness, privacy and reliability in AI systems.', 'Responsible AI', '2026-11-25');

INSERT INTO activities_1234 (title, description, status, date) VALUES
  ('Build Student Portal', 'Design React pages and router for assignment', 'In Progress', '2026-02-25'),
  ('MySQL Practice', 'Create roll-based tables and seed records', 'Planned', '2026-02-27');

SELECT name, email FROM students_1234;
