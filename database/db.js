import mysql from 'mysql2/promise.js'

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'lista03'
});

export default connection;