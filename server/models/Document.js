import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, default: '' },
  editors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastEdited: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Document', documentSchema);