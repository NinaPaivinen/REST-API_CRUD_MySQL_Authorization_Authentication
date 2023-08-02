
const mysql = require("mysql2");

const yhteys = require("./db.private.js");

// luo yhteys (mysql.createPool toinen vaihtoehto)
const conn = mysql.createPool({
  host: yhteys.HOST,
  user: yhteys.USER,
  password: yhteys.PASSWORD,
  database: yhteys.DB
});
/*
conn.connect(function (err) {
  if (err) {
    console.log("Tietokantayhteys epäonnistui");
    throw err;
  }
  else{
  console.log("Tietokantayhteys onnistui");
  }
});
*/
module.exports = conn;
