const mysql = require ('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME
});

db.connect((err)=>{
    if(err){
        console.error("MySQL connection failed: ", err);
    }else{
        console.log("Connected to MySQL database");
    }
});

module.exports = db;
