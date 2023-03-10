const mysql = require('mysql');

const connect = mysql.createConnection({
    host: 'localhost',
  //database : 'annisa-mvc' is default relational 
    database: 'annisa-mvc',
    port: 3306,
    user: 'root',
    password: '',
});

module.exports = connect;