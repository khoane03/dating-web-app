import pool from '../config/dbConfig.js';

class LocationService {
  static async updateUserLocation(acc_id, { address, latitude, longitude }) {
    try {
      const query = `UPDATE tbl_users SET address = $1, latitude = $2, longitude = $3 WHERE acc_id = $4 RETURNING *;`;
      const values = [address, latitude, longitude, acc_id];
      const result = await pool.query(query, values);

      if (result.rowCount === 0) {
        throw new Error('User not found');
      }

      return { code: 200, message: "Thành công!", data: result.rows[0] };
    } catch (error) {
      console.error('Database error in updateUserLocation:', error.message);
      throw error;
    }
  }

  static async getUserLocation(userId) {
    try {
      const query = `SELECT latitude, longitude, address FROM tbl_users WHERE acc_id = $1;`;
      const values = [userId];
      const result = await pool.query(query, values);

      if (result.rowCount === 0) {
        throw new Error('User not found');
      }

      return { code: 200, message: "Thành công!", data: result.rows[0] };
    } catch (error) {
      console.error('Database error in getUserLocation:', error.message);
      throw error;
    }
  }
}

export default LocationService;