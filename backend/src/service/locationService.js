import pool from '../config/dbConfig.js';

class LocationService {
  static async updateUserLocation(userId, { address, latitude, longitude }) {
    try {
      const query = `
        UPDATE tbl_users 
        SET address = $1, latitude = $2, longitude = $3 
        WHERE id = $4 
        RETURNING *;
      `;
      const values = [address, latitude, longitude, userId];
      const result = await pool.query(query, values);

      if (result.rowCount === 0) {
        throw new Error('User not found');
      }

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default LocationService;