import mongoose from 'mongoose';

const logisticsSchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  type: { type: String, enum: ['flight', 'train', 'bus', 'hotel'], required: true },
  details: mongoose.Schema.Types.Mixed, // flexible for different types
});

export default mongoose.model('Logistics', logisticsSchema);
