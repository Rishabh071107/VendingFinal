import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rishabh07',
  database: 'vending_final',
});

db.connect((err) => {   
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database.');
    }
});
export default db;
