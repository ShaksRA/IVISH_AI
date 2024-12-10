import { io } from 'socket.io-client';

interface Message {
  content: string;
  sender: string;
  timestamp: string;
  translations?: Record<string, string>;
}

interface DocumentUpdate {
  content: string;
  cursor: { line: number; ch: number };
  userId: string;
}

const socket = io('http://localhost:3000', {
  autoConnect: false,
});

export const connectSocket = (userId: string, room: string) => {
  socket.auth = { userId: userId.toString() };
  socket.connect();
  socket.emit('user:join', { 
    userId: userId.toString(), 
    room 
  });
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const subscribeToMessages = (callback: (message: Message) => void) => {
  socket.on('message:received', (message: Message) => {
    // Ensure the data is serializable
    callback({
      ...message,
      timestamp: new Date(message.timestamp).toISOString(),
      sender: message.sender.toString()
    });
  });
  return () => {
    socket.off('message:received');
  };
};

export const subscribeToDocumentChanges = (callback: (update: DocumentUpdate) => void) => {
  socket.on('document:update', (update: DocumentUpdate) => {
    // Ensure the data is serializable
    callback({
      ...update,
      userId: update.userId.toString()
    });
  });
  return () => {
    socket.off('document:update');
  };
};

export const sendMessage = (content: string, room: string, language: string) => {
  socket.emit('message:send', { 
    content, 
    room, 
    language 
  });
};

export const updateDocument = (documentId: string, content: string, cursor: { line: number; ch: number }) => {
  socket.emit('document:edit', { 
    documentId: documentId.toString(), 
    content,
    cursor: {
      line: Math.round(cursor.line),
      ch: Math.round(cursor.ch)
    }
  });
};

export default socket;