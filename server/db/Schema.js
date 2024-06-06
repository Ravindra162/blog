const {client}= require('../db/db')
const User = `
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
const posts = `
    CREATE TABLE Posts (
        post_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
        category_id INT REFERENCES Categories(category_id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        image_url TEXT
    );
    ALTER TABLE Posts
RENAME COLUMN image_url TO image;

-- Change the column type from TEXT to VARCHAR
ALTER TABLE Posts
ALTER COLUMN image TYPE VARCHAR(255);

ALTER TABLE Posts
ADD COLUMN upvotes INT DEFAULT 0,
ADD COLUMN downvotes INT DEFAULT 0;
`
const comments = `
CREATE TABLE Comments (
    comment_id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INT REFERENCES Posts(post_id) ON DELETE CASCADE,
    user_id INT REFERENCES Users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`
const upvotes = `
CREATE TABLE upvotes (
    user_id INT REFERENCES users(user_id),
    blog_id INT REFERENCES posts(post_id),
    PRIMARY KEY (user_id, blog_id)
  );
`
const  downvotes = `
CREATE TABLE downvotes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    blog_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_downvote UNIQUE (user_id, blog_id)
);
`
