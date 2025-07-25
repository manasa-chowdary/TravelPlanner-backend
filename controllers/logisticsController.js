import Logistics from '../models/Logistics.js';

// Add a logistics entry to a trip
export const addLogistics = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { type, details } = req.body;
    const logistics = new Logistics({ trip: tripId, type, details });
    await logistics.save();
    res.status(201).json(logistics);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add logistics', error: err.message });
  }
};

// Get all logistics for a trip
export const getLogistics = async (req, res) => {
  try {
    const { tripId } = req.params;
    const logistics = await Logistics.find({ trip: tripId });
    res.status(200).json(logistics);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch logistics', error: err.message });
  }
};

// Delete a logistics entry
export const deleteLogistics = async (req, res) => {
  try {
    const { logisticsId } = req.params;
    const logistics = await Logistics.findByIdAndDelete(logisticsId);
    if (!logistics) return res.status(404).json({ message: 'Logistics not found' });
    res.status(200).json({ message: 'Logistics deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete logistics', error: err.message });
  }
}; 