CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  role ENUM('teacher', 'student') NOT NULL
);

INSERT INTO users (username, password, role)
VALUES
  ('john_doe', 'password123', 'teacher'),
  ('jane_smith', 'password456', 'teacher'),
  ('bob_jones', 'password789', 'student'),
  ('susan_brown', 'password321', 'student');
