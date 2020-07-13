const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    username: "root",
    password: "",
    database: "test"
});

module.exports = {
    con
}