ALTER TABLE students_1234 ADD COLUMN twelfth_percentage DECIMAL(5,2);
ALTER TABLE students_1234 ADD COLUMN college VARCHAR(120);
ALTER TABLE students_1234 ADD COLUMN cgpa DECIMAL(4,2);
ALTER TABLE students_1234 ADD COLUMN college_start_year INTEGER;
ALTER TABLE students_1234 ADD COLUMN college_end_year INTEGER;

UPDATE students_1234
SET roll_number = '24UADS1047', course = 'Artificial Intelligence and Data Science (AIDS)',
    twelfth_percentage = 94, college = 'MBM University', cgpa = 8.10, college_start_year = 2024, college_end_year = 2027
WHERE roll_number IN ('1234', '24UADS1047');

INSERT INTO Subject_1234 (course_id, description, subject_name, date)
VALUES
  (7, 'Train feedforward neural networks using backpropagation and study how hidden layers learn representations.', 'Multilayer Perceptrons (MLP)', '2026-11-25'),
  (8, 'Analyze images with convolutional networks, object detection and image segmentation.', 'Computer Vision', '2026-11-25'),
  (9, 'Study how language and diffusion models generate text and images, and evaluate their outputs.', 'Generative AI', '2026-11-25'),
  (10, 'Represent text, build language models and evaluate text classification and retrieval.', 'Natural Language Processing', '2026-11-25'),
  (11, 'Estimate population parameters and test hypotheses using sample data.', 'Statistical Inference', '2026-11-25'),
  (12, 'Discover patterns with clustering, association rules and anomaly detection.', 'Data Mining', '2026-11-25'),
  (13, 'Evaluate fairness, privacy and reliability in AI systems.', 'Responsible AI', '2026-11-25');
