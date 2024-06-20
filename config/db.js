import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog_db',
    waitForConnections: true,
    queueLimit: 0,
});

export default pool;