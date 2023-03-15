-- DROP TABLE students;

-- DROP TYPE user_role;

CREATE TYPE user_role AS ENUM ('user', 'admin');

CREATE TABLE
    students(
        id BIGSERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        student_address VARCHAR(255),
        city VARCHAR(255),
        state_of_origin VARCHAR(255),
        zip VARCHAR(255),
        gpa VARCHAR(255),
        grad_year VARCHAR(255),
        role user_role NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

-- SELECT * FROM students;