import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database_name', 'username', 'password', {
  host: 'localhost', 
  dialect: 'postgres',
  logging: false, 
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối thành công!');
  } catch (error) {
    console.error('Kết nối thất bại:', error);
  }
})();

export default sequelize;