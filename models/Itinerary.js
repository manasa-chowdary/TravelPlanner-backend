import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  name: String,
  location: String,
  time: String,
  description: String,
  tags: [String],
  expenses: [{
    description: String,
    amount: Number,
    person: String,
    date: Date,
  }],
  notes: [String],
  attachments: [String],
});

const itinerarySchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  day: Number,
  date: Date,
  activities: [activitySchema],
});

export default mongoose.model('Itinerary', itinerarySchema);