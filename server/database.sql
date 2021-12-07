CREATE DATABASE jwttutorial;

-- set extention for uudi
create extension if not exists "uuid-ossp";

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT 
    uuid_generate_v4(),
    user_name VARCHAR (255) NOT NULL,
    user_email VARCHAR (255) NOT NULL,
    user_password VARCHAR (255) NOT NULL
);

-- insert dummy data

INSERT INTO users (user_name, user_email, user_password) 
    VALUES ('henry', 'henry213@gmail.com', 'kthl18822');

