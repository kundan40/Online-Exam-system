CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(150) UNIQUE,
  password VARCHAR(255),
  role ENUM('student','teacher','admin'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  teacher_id INT,
  start_time DATETIME,
  end_time DATETIME,
  FOREIGN KEY (teacher_id) REFERENCES users(id)
);

CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_id INT,
  question TEXT,
  option_a VARCHAR(255),
  option_b VARCHAR(255),
  option_c VARCHAR(255),
  option_d VARCHAR(255),
  correct_option CHAR(1),
  FOREIGN KEY (exam_id) REFERENCES exams(id)
);


CREATE TABLE answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  question_id INT,
  selected_option CHAR(1),
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);





api/
│── config/
│   └── database.php
│
│── auth/
│   ├── register.php
│   └── login.php
│
│── exams/
│   ├── create.php
│   ├── list.php
│   └── submit.php
│
│── middleware/
│   └── auth.php
│
└── index.php
