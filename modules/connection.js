import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'devteam',
  password: '123456',
  database: 'tasks',
});

export default connection;
