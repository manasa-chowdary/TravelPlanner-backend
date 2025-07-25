// controllers/tripController.js
import Trip from '../models/Trip.js';
console.log('updateBudget called')
export const createTrip = async (req, res) => {
  try {
    console.log('createTrip req.body:', req.body); // debug
    const { name, from, to, startDate, endDate } = req.body;

    // Basic validation
    if (!name || !from || !to || !startDate || !endDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTrip = new Trip({
      name,
      from,
      to,
      startDate,
      endDate,
      user: req.user.id, // from auth middleware
    });

    await newTrip.save();

    res.status(201).json({ message: 'Trip created successfully', trip: newTrip });
  } catch (err) {
    console.error('Error in createTrip:', err);
    res.status(500).json({ message: 'Failed to create trip', error: err.message });
  }
};

export const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id });

    res.status(200).json(trips);
  } catch (err) {
    console.error('Error in getMyTrips:', err);
    res.status(500).json({ message: 'Failed to fetch trips', error: err.message });
  }
};

export const editTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { from, to, startDate, endDate } = req.body;
    const trip = await Trip.findOne({ _id: id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (from) trip.from = from;
    if (to) trip.to = to;
    if (startDate) trip.startDate = startDate;
    if (endDate) trip.endDate = endDate;
    await trip.save();
    res.status(200).json({ message: 'Trip updated successfully', trip });
  } catch (err) {
    console.error('Error in editTrip:', err);
    res.status(500).json({ message: 'Failed to update trip', error: err.message });
  }
};
console.log('updateBudget called')
export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findOneAndDelete({ _id: id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.status(200).json({ message: 'Trip deleted successfully' });
  } catch (err) {
    console.error('Error in deleteTrip:', err);
    res.status(500).json({ message: 'Failed to delete trip', error: err.message });
  }
};

export const updateBudget = async (req, res) => {
  console.log('updateBudget called');
  console.log('updateBudget headers:', req.headers);
  console.log('updateBudget req.body:', req.body);
  try {
    const { id } = req.params;
    const { budget } = req.body;
    const trip = await Trip.findOne({ _id: id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    trip.budget = budget;
    await trip.save();
    res.status(200).json({ message: 'Budget updated successfully', trip });
  } catch (err) {
    console.error('Error in updateBudget:', err);
    res.status(500).json({ message: 'Failed to update budget', error: err.message });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, date } = req.body;
    const trip = await Trip.findOne({ _id: id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    trip.expenses.push({ description, amount, date });
    await trip.save();
    res.status(201).json({ message: 'Expense added successfully', trip });
  } catch (err) {
    console.error('Error in addExpense:', err);
    res.status(500).json({ message: 'Failed to add expense', error: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id, expenseId } = req.params;
    const trip = await Trip.findOne({ _id: id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    trip.expenses = trip.expenses.filter(exp => exp._id.toString() !== expenseId);
    await trip.save();
    res.status(200).json({ message: 'Expense deleted successfully', trip });
  } catch (err) {
    console.error('Error in deleteExpense:', err);
    res.status(500).json({ message: 'Failed to delete expense', error: err.message });
  }
};

export const addParticipant = async (req, res) => {
  try {
    const { id } = req.params; // trip id
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    const trip = await Trip.findOne({ _id: id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    if (trip.participants.includes(email)) {
      return res.status(400).json({ message: 'Participant already added' });
    }
    trip.participants.push(email);
    await trip.save();
    res.status(200).json({ message: 'Participant added', trip });
  } catch (err) {
    console.error('Error in addParticipant:', err);
    res.status(500).json({ message: 'Failed to add participant', error: err.message });
  }
};

export const removeParticipant = async (req, res) => {
  try {
    const { id } = req.params; // trip id
    const { email } = req.body;
    const trip = await Trip.findOne({ _id: id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    trip.participants = trip.participants.filter(e => e !== email);
    await trip.save();
    res.status(200).json({ message: 'Participant removed', trip });
  } catch (err) {
    console.error('Error in removeParticipant:', err);
    res.status(500).json({ message: 'Failed to remove participant', error: err.message });
  }
};

