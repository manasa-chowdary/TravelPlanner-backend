import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  participants: [{
    type: String, // could be email or user ID
    trim: true,
  }],
  attachments: [{
    type: String, // file path or URL
  }],
  budget: {
    type: Number,
    default: 0,
  },
  expenses: [
    {
      description: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
    }
  ],
}, { timestamps: true });

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
