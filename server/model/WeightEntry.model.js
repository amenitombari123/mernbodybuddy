// WeightEntry.model.js
import mongoose from 'mongoose';

const WeightEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  weight: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('WeightEntry', WeightEntrySchema);
