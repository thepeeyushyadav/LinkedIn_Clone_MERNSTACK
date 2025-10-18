import { io } from "socket.io-client";

// Prefer VITE_API_URL if provided (deployed env), otherwise fall back to window.location origin
const apiUrl = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.origin) || 'http://localhost:4000';

// Ensure socket uses the correct protocol (ws/wss) for the API URL
const socketUrl = apiUrl.replace(/^http/, 'ws');

const socket = io(socketUrl);

export default socket;