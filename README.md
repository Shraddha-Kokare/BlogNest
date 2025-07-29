
# Blog Web Application

A full-stack blogging web app built with React (frontend), Express.js (backend), and MongoDB (database). Users can register, log in, write blogs, upload images, and view blog posts.

## 🌐 Features

- User authentication using JWT.
- Upload and display blog images.
- View all blogs on a responsive grid.
- View individual blog posts in detail.
- Mobile responsive design.

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB

**Others:**
- JWT for authentication
- Multer for image upload

## 📁 Project Structure

```
client/                # React Frontend
├── components/        # Navbar, Blog, etc.
├── pages/             # Blogs, SingleBlog, UploadBlog
├── App.jsx            # App routing
├── main.jsx           # Entry point

server/                # Node.js + Express Backend
├── models/            # Mongoose schemas for User and Blog
├── routes/            # API routes for blog and auth
├── uploads/           # Uploaded images
├── index.js           # Main server logic
```

## ⚙️ Setup Instructions

### Backend Setup

```bash
cd server
npm install
node index.js
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## 🔐 API Routes

### POST `/register`
- Registers a new user.

### POST `/login`
- Logs in a user and returns a JWT token.

### POST `/getBlogs`
- Returns all blog posts (requires token).

### POST `/uploadBlog`
- Uploads a new blog post with an image.

### POST `/getBlog`
- Fetch a single blog post by `blogId` (requires token).

## 📱 Responsiveness

The blog grid adapts to different screen sizes using Tailwind’s responsive utilities.

## 📝 Sample Blog Content

**Title:** Exploring AI in 2025  
**Description:** A look into how AI is shaping our future across various domains, from healthcare to entertainment. Discover the latest trends, breakthroughs, and real-world applications that define the new AI age.

---

**Title:** Mastering Web Development in 2025  
**Description:** Web development continues to evolve with new frameworks and best practices. In this article, we break down the tools, workflows, and strategies to help developers stay ahead in the modern web landscape.

---

**Title:** Embracing Minimalism in Tech Design  
**Description:** Learn how minimalism is transforming user interfaces and experience in the digital age. Discover the principles behind clean, efficient, and accessible design.

## 🙌 Author

Shraddha Kokare

---
Feel free to contribute or customize further!
