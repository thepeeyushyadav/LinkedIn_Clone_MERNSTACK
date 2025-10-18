import { io } from "socket.io-client";

const SOCKET_URL = process.env.NODE_ENV === "production"
  ? "https://linkedin-clone-mernstack-1.onrender.com"  // Render backend URL
  : "http://localhost:4000";                            // Local dev

const socket = io(SOCKET_URL, {
  transports: ["websocket"], // optional but recommended
});

export default socket;
