import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalLanguage: { type: String, required: true },
  translations: [{
    language: String,
    content: String
  }],
  room: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);