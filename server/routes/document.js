import express from 'express';
import Document from '../models/Document.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const documents = await Document.find({
      $or: [
        { owner: req.user.userId },
        { editors: req.user.userId }
      ]
    }).populate('owner', 'name avatar');
    
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const document = await Document.create({
      title,
      content,
      owner: req.user.userId,
      editors: [req.user.userId]
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const document = await Document.findOneAndUpdate(
      { 
        _id: req.params.id,
        $or: [
          { owner: req.user.userId },
          { editors: req.user.userId }
        ]
      },
      { 
        title,
        content,
        lastEdited: Date.now()
      },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;