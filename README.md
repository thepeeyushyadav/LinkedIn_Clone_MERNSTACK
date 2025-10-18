# 🔗 LinkedIn Clone (MERN Stack + Socket.io)

![Project Status](https://img.shields.io/badge/status-in%20progress-yellowgreen)
![Technology](https://img.shields.io/badge/stack-MERN-blue)
![Realtime](https://img.shields.io/badge/realtime-Socket.io-brightgreen)

2. Technology Highlight

(A high-level overview of the technologies used.)

🔥 A Full Stack Professional Networking Web App built with:
⚛️ **React.js (Vite)** (Frontend SPA)
🟢 **Node.js** (Backend Runtime)
⚡ **Express.js** (Backend Framework)
🍃 **MongoDB** (NoSQL Database)
🔐 **JSON Web Tokens (JWT)** (Authentication)
💬 **Socket.io** (Real-time Messaging & Notifications)
🎨 **Material UI (MUI)** (UI Components)

## 3. 🚀 Project Overview

This is a full-stack clone of the professional networking platform, LinkedIn, built from the ground up using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. The project's goal is to replicate the core functionalities of LinkedIn, including user authentication, profile management, creating posts, and social interactions like_likes and comments.
A key feature of this application is its real-time capability, powered by **Socket.io**. This enables an interactive chat system (`Messages` page) and live updates for new connections and interactions (`Notification` page), providing a modern and dynamic user experience.

## 4. Detailed Project Architecture

This project utilizes a classic MERN stack architecture, enhanced with WebSockets for real-time communication. The system is decoupled into a React.js frontend and a Node.js/Express.js backend.

### Architecture Diagram

          ┌──────────────────────────┐
          │  React.js Frontend (Vite)│
          │ (Pages: Profile, Feed,   │
          │  Messages, MyNetwork)    │
          └─────┬──────────────┬─────┘
                │              │
    (HTTP REST API)      (WebSocket)
         (Axios)       (Socket.io Client)
                │              │
                ▼              ▼
          ┌─────┴──────────────┴─────┐
          │  Node.js / Express.js    │
          │       (Backend Server)   │
          ├──────────────────────────┤
          │    REST API Endpoints    │      ┌──────────────────┐
          │  (Routes: /api/posts,    │      │ Socket.io Server │
          │   /api/users, /api/msg)  │◀──▶   (Handles Events) │
          └─────┬──────────────────┬─┘      └──────────────────┘
                │                  │
                ▼                  │
    ┌───────────────────┐    (Socket Events)
    │  Auth Middleware  │
    │ (Verifies JWT)    │
    └─────────┬─────────┘
              │
              ▼
    ┌───────────────────┐
    │   Controllers     │
    │(Business Logic)   │
    │(post, user, msg)  │
    └─────────┬─────────┘
              │
              ▼
    ┌───────────────────┐
    │ Models (Mongoose) │
    └─────────┬─────────┘
              │
              ▼
    ┌───────────────────┐
    │   MongoDB         │
    │   Database        │
    └───────────────────┘

### Data Flow Explained

The application has two primary data flow patterns:

**1. Standard HTTP Request (e.g., Fetching the Feed):**
1.  **Client:** The React `Feeds` page component makes an asynchronous `GET` request using **Axios** to the `/api/posts` endpoint.
2.  **Server (Router):** The Express server receives the request and matches it to the `post.js` route.
3.  **Server (Middleware):** The request first passes through the `auth.js` middleware, which verifies the `Authorization` header for a valid **JWT**.
4.  **Server (Controller):** If authenticated, the request is passed to the `post.js` controller function.
5.  **Server (Model):** The controller calls the `Post` model (Mongoose schema) to execute a `find()` query on the MongoDB database.
6.  **Database:** MongoDB returns the collection of post documents.
7.  **Response:** The server sends the data back to the client as a JSON response, which React then uses to update the state and render the UI.

**2. Real-time Event (e.g., Sending a Chat Message):**
1.  **Client (Sender):** The React `Messages` page component emits a WebSocket event using **Socket.io-client** (e.g., `socket.emit('sendMessage', { ...data })`).
2.  **Server (Socket.io):** The central Socket.io instance on the Node.js server listens for the `sendMessage` event.
3.  **Server (Controller/Model):** The server saves the new message to the `messages` collection in MongoDB (using the `Message` model) and updates the `conversation` model.
4.  **Server (Socket.io):** The server then emits a `receiveMessage` event to the specific recipient (based on their user ID or socket ID).
5.  **Client (Receiver):** The recipient's React app, which is also connected to Socket.io, receives the `receiveMessage` event and instantly updates the `Messages` page UI with the new message without needing a page refresh.

#  5. Key Features
(A list of features based on your file structure.)
## ✨ Key Features (from File Structure)

* **User Authentication**: Secure JWT-based user Sign Up (`SignUp` page) and Login (`Login` page) (`authentication/auth.js`).
* **Main Feed (`Feeds` page)**: A central hub to scroll through posts, create new posts (`AddModal`), and interact.
* **Social Interactions**: Ability to Like and Comment on posts (`models/comment.js`).
* **Detailed User Profile (`Profile` page)**: Users can manage their personal information (`EditInfoModal`), summary (`AboutModal`), and professional experience (`ExpModal`).
* **Professional Networking (`MyNetwork` page)**: Functionality to manage user connections and build a network.
* **Real-time Messaging (`Messages` page)**: 1-on-1 instant chat with connections, powered by Socket.io (`models/conversation.js`, `models/message.js`).
* **Live Notifications (`Notification` page)**: Real-time alerts for new messages, likes, and connection requests (`models/notification.js`).
* **Resume & Activity Tracking**: Pages for users to manage their resumes (`Resume` page) and view their activity logs (`AllActivities` page).

## 6.  🧑‍💻 Tech Stack

| Layer | Technology Used |
| :--- | :--- |
| **Frontend** | React.js (v18+), React Router, Redux (State Management), Material UI (MUI), Axios, Socket.io-client |
| **Backend** | Node.js, Express.js, Socket.io, Mongoose (ODM) |
| **Database** | MongoDB (NoSQL Database) |
| **Authentication** | JSON Web Tokens (JWT), bcrypt.js (Password Hashing) |
| **Build Tool** | Vite |

## 7. 🚀 Getting Started / How to Run

Follow these instructions to get a copy of the project up and running on your local machine.

📌 **Prerequisites:**
* [Node.js (v18+)](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/try/download/community) (Local installation or a free MongoDB Atlas account)

### Backend Setup (Folder: `linkedin-backend`)

1.  Clone the repository and navigate to the backend folder:
    ```bash
    git clone [https://github.com/thepeeyushyadav/Linked-Clone-MernStack.git](https://github.com/thepeeyushyadav/Linked-Clone-MernStack.git)
    cd Linked-Clone-MernStack/linkedin-backend
    ```

2.  Install NPM packages:
    ```bash
    npm install
    ```

3.  Create a `.env` file:
    Create a file named `config.env` in the `linkedin-backend` root folder and add the following variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key_for_jwt
    PORT=5000
    ```
    *Note: Ensure your `MONGO_URI` is correct to avoid authentication errors.*

4.  Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup (Folder: `linkedin-frontend`)

1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd Linked-Clone-MernStack/linkedin-frontend
    ```

2.  Install NPM packages:
    ```bash
    npm install
    ```

3.  Start the frontend development server (using Vite):
    ```bash
    npm run dev
    ```

The application should now be running on `http://localhost:5173` (or the port specified by Vite).


## 8. ✍️ Author

👨‍💻 **Piyush Pal**
📍 Dewas, Indore, Madhya Pradesh
📫 thepeeyushyadav0@gmail.com

🔗 [LinkedIn Profile](https://www.linkedin.com/in/piyush-pal-751067306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
📸 [Instagram](https://www.instagram.com/thepeeyushyadav?igsh=dW9tYmp4czgya2hj)
🎥 [YouTube (ThinkCodeX)](https://www.youtube.com/@ThinkCodeX)
 
