import Itinerary from '../models/Itinerary.js';

// Create a new itinerary day for a trip
export const createItineraryDay = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { day, date } = req.body;
    const itinerary = new Itinerary({ trip: tripId, day, date, activities: [] });
    await itinerary.save();
    res.status(201).json(itinerary);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create itinerary day', error: err.message });
  }
};

// Get all itinerary days for a trip
export const getItinerary = async (req, res) => {
  try {
    const { tripId } = req.params;
    const itinerary = await Itinerary.find({ trip: tripId });
    res.status(200).json(itinerary);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch itinerary', error: err.message });
  }
};

// Add an activity to an itinerary day
export const addActivity = async (req, res) => {
  try {
    const { itineraryId } = req.params;
    const activity = req.body;
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    itinerary.activities.push(activity);
    await itinerary.save();
    res.status(201).json(itinerary);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add activity', error: err.message });
  }
};

// Edit an activity in an itinerary day
export const editActivity = async (req, res) => {
  try {
    const { itineraryId, activityId } = req.params;
    const updates = req.body;
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    const activity = itinerary.activities.id(activityId);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    Object.assign(activity, updates);
    await itinerary.save();
    res.status(200).json(itinerary);
  } catch (err) {
    res.status(500).json({ message: 'Failed to edit activity', error: err.message });
  }
};

// Delete an activity from an itinerary day
export const deleteActivity = async (req, res) => {
  try {
    const { itineraryId, activityId } = req.params;
    const itinerary = await Itinerary.findById(itineraryId);
    if (!itinerary) return res.status(404).json({ message: 'Itinerary not found' });
    itinerary.activities.id(activityId).remove();
    await itinerary.save();
    res.status(200).json(itinerary);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete activity', error: err.message });
  }
}; 