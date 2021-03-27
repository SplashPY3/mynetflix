const mysql = require('mysql');
const md5 = require("md5");

const conn = mysql.createConnection({
    host: "localhost",
    user: "max",
    password: "max",
    database: "myapp"
  });
  
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MariaDB!");
  });

module.exports = conn;