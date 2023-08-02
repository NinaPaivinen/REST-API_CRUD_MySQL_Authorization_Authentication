
// strict mode
'use strict';


// Models - The schema definition of the Model 

//  käytetään tietokantaa
let conn = require('../tietokanta/db.asetukset.js');

//koira object create
const Koira = function (koira) {
    this.id = koira.id;
    this.kennelnimi = koira.kennelnimi;
    this.kutsumanimi = koira.kutsumanimi;
    this.syntymapaiva = koira.syntymapaiva;
    this.kennel = koira.kennel;
    this.sukupuoli = koira.sukupuoli;
this.created_at = new Date();
    this.updated_at =   new Date();
};

//**************************luo koira POST */
Koira.create = function (newDog, result) {
      // autocommit päälle
//  sql.query("SET autocommit =1");
    conn.query("INSERT INTO powderpuff set ?", newDog, function (err, res) {
          // Jos virhe haussa:
        if (err) {
            console.log("Virhe luoda uusi koira -model: ", err);
            result(err, null);
        } 
        // Jos ei virhettä:
        else {
            console.log("Onnistui luoda uusi koira -model",res.insertId);
            result(null, res.insertId);
        }
    });
      // autocommit varmasi taas onhan päällä!!
 // sql.query("COMMIT");
};
//*****************näytä kaikki GET*/
Koira.findAll = function (result) {
    conn.query("Select * from powderpuff", function (err, res) {
        if (err) {
            console.log("Virhe löytää kaikki koirat -model: ", err);
            result(null, err);
        }
        else {
            console.log('Kaikki koirat löytyi - model : ', res);
            result(null, res);
        }
    });
};
//*****************************findby id GET */
Koira.findById = function (id, result) {
    conn.query("Select * from powderpuff where id = ? ", id, function (err, res) {
        if (err) {
            console.log("Virhe löytää koira by id -model: ", err);
            result(err, null);
        }
        else {
            result(null, res);
            console.log("Löytyi koira by id - model: ", id);
        }
    });
};
//*****************************päivitä koira update PUT */
Koira.update = function (id, koira, result) {
    conn.query("UPDATE powderpuff SET kennelnimi=?,kutsumanimi=?,syntymapaiva=?,kennel=?,sukupuoli=?,updated_at=? WHERE id = ?", 
    [koira.kennelnimi, koira.kutsumanimi, koira.syntymapaiva, koira.kennel, koira.sukupuoli, koira.updated_at, id], function (err, res) {
        if (err) {
            console.log("Virhe päivittää koira by id -model: ", err);
            result(null, err);
        } else {
            result(null, res);    
            console.log("Koiran päivitys onnistui by id - model: ");
        }
    });
};
//*****************************poista DELETE*/
Koira.delete = function (id, result) {
    conn.query("DELETE FROM powderpuff WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("Virhe poistaa koira by id - model: ", err);
            result(null, err);
        }
        else {
            result(null, res);
            console.log("Koiran poistettu onnistui by id - model: ");
        }
    });
};
module.exports = Koira;