import { translateText } from '../services/translation.js';

export const setupWebSocket = (io) => {
  const activeUsers = new Map();

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('user:join', ({ userId, room }) => {
      // Ensure userId is a string
      const userIdStr = userId.toString();
      activeUsers.set(socket.id, { userId: userIdStr, room });
      socket.join(room);
      
      // Convert Map values to a plain array of objects
      const activeUsersList = Array.from(activeUsers.values()).map(user => ({
        userId: user.userId.toString(),
        room: user.room
      }));
      
      io.to(room).emit('user:active', activeUsersList);
    });

    socket.on('message:send', async ({ content, room, language }) => {
      const translations = await translateText(content, language);
      const userData = activeUsers.get(socket.id);
      
      if (userData) {
        io.to(room).emit('message:received', {
          content,
          translations,
          sender: userData.userId.toString(),
          timestamp: new Date().toISOString()
        });
      }
    });

    socket.on('document:edit', ({ documentId, content, cursor }) => {
      const userData = activeUsers.get(socket.id);
      if (userData) {
        socket.to(documentId).emit('document:update', {
          content,
          cursor: {
            line: Math.round(cursor.line),
            ch: Math.round(cursor.ch)
          },
          userId: userData.userId.toString()
        });
      }
    });

    socket.on('disconnect', () => {
      const userData = activeUsers.get(socket.id);
      if (userData) {
        const { room } = userData;
        activeUsers.delete(socket.id);
        
        // Convert Map values to a plain array of objects
        const activeUsersList = Array.from(activeUsers.values()).map(user => ({
          userId: user.userId.toString(),
          room: user.room
        }));
        
        io.to(room).emit('user:active', activeUsersList);
      }
    });
  });
};