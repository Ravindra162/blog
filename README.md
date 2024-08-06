# Blogger

Blogger is a simple blog application that allows users to post blogs, upvote content, and includes user authentication.

## Features

- User authentication (signup, login, logout)
- Create and publish blog posts
- View blog posts
- Upvote blog posts
- Responsive design for mobile and desktop

## Tech Stack

- Frontend: React.js
- Backend: Express.js
- Database: PostgreSQL

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- PostgreSQL (v12.0 or later)



## API Endpoints

- POST /api/auth/signup: User registration
- POST /api/auth/login: User login
- GET /api/posts: Fetch all blog posts
- POST /api/posts: Create a new blog post
- PUT /api/posts/:id/upvote: Upvote a blog post
