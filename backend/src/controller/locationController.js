import LocationService from '../service/locationService.js';

export const updateUserLocation = async (req, res) => {
  const { userId } = req.params;
  const { address, latitude, longitude } = req.body;

  try {
    const updatedUser = await LocationService.updateUserLocation(userId, { address, latitude, longitude });
    res.status(200).json({
      message: 'Location updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating location:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
