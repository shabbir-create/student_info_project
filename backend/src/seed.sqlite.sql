CREATE TABLE students_1234 (
  id INTEGER PRIMARY KEY, name TEXT NOT NULL, roll_number TEXT UNIQUE NOT NULL,
  course TEXT NOT NULL, email TEXT NOT NULL, city TEXT NOT NULL, school TEXT NOT NULL,
  year_of_passing INTEGER NOT NULL, tenth_percentage NUMERIC NOT NULL
);
CREATE TABLE Subject_1234 (
  id INTEGER PRIMARY KEY, course_id INTEGER NOT NULL, description TEXT NOT NULL,
  subject_name TEXT NOT NULL, date TEXT NOT NULL
);
CREATE TABLE activities_1234 (
  id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('Planned','In Progress','Completed')), date TEXT NOT NULL
);

INSERT INTO students_1234
  (name, roll_number, course, email, city, school, year_of_passing, tenth_percentage)
VALUES
  ('Shabbir', '1234', 'B.Tech CSE', 'shabbir6075@gmail.com', 'Pali', 'V.M.S Senior Secondary School', 2022, 89.40);

INSERT INTO Subject_1234 (course_id, description, subject_name, date)
VALUES
  (1, 'Data structures and problem solving', 'Data Structures', '2026-01-10'),
  (2, 'Web development with React ecosystem', 'Frontend Engineering', '2026-01-11'),
  (3, 'Database design and SQL operations', 'Database Management', '2026-01-12'),
  (4, 'Introduction to machine learning algorithms and models', 'Machine Learning', '2026-01-13'),
  (5, 'Concepts of process management, memory management, and scheduling', 'Operating Systems', '2026-01-14'),
  (6, 'Software development lifecycle and agile methodologies', 'Software Engineering', '2026-01-17');

INSERT INTO activities_1234 (title, description, status, date) VALUES
  ('Build Student Portal', 'Design React pages and router for assignment', 'In Progress', '2026-02-25'),
  ('MySQL Practice', 'Create roll-based tables and seed records', 'Planned', '2026-02-27');
