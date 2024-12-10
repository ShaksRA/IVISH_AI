import express from 'express';
import Message from '../models/Message.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/messages/:room', authenticateToken, async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room })
      .populate('sender', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/messages', authenticateToken, async (req, res) => {
  try {
    const { content, room, originalLanguage } = req.body;
    const message = await Message.create({
      content,
      sender: req.user.userId,
      room,
      originalLanguage
    });

    const populatedMessage = await message.populate('sender', 'name avatar');
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;