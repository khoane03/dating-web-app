import LocationService from '../service/locationService.js';

export const updateUserLocation = async (req, res) => {
  const { id } = req.user;
  const { address, latitude, longitude } = req.body;

  try {
    const updatedUser = await LocationService.updateUserLocation(id, { address, latitude, longitude });
    res.status(200).json({
      message: 'Location updated successfully',
      user: updatedUser.data,
    });
  } catch (error) {
    console.error('Error updating location:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserLocation = async (req, res) => {

  const { id } = req.user;

  try {
    const userLocation = await LocationService.getUserLocation(id);
    res.status(200).json(userLocation);
  } catch (error) {
    console.error('Error fetching user location:', error);
    if (error.message === 'User not found') {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
