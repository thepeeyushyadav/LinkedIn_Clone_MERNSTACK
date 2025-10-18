require('dotenv').config({ path: './config.env' });
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer(app);

require("./connection");

const io = new Server(server, {
  cors: {
    origin: "https://liinkedinn.netlify.app",
    methods: ["GET", "POST"],
  },
});


const PORT = process.env.PORT || 4000; //4000

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://liinkedinn.netlify.app",
  })
);

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("joinConversation", ({ conversationId }) => {
    console.log(`User joined Conversation ID of ${conversationId}`);
    socket.join(conversationId);
  });

  socket.on("sendMessage", (convId, messageDetail) => {
    console.log("message Sent");

    io.to(convId).emit("receiveMessage", messageDetail);
  });
});

const UserRoutes = require("./routes/user");
const PostRoutes = require("./routes/post");
const NotificationRoutes = require("./routes/notification");
const CommentRoutes = require("./routes/comment");
const ConversationRoutes = require("./routes/conversation");
const MessageRoutes = require("./routes/message");

app.use("/api/auth", UserRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/notification", NotificationRoutes);
app.use("/api/comment", CommentRoutes);
app.use("/api/conversation", ConversationRoutes);
app.use("/api/message", MessageRoutes);

server.listen(PORT, () => {
  console.log("Backend server is running on Port", PORT);
});