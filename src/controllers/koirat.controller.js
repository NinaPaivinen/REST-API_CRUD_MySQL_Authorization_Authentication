
// strict mode,  directive was new in ECMAScript version 5.
'use strict';


const Koira = require('../models/koirat.model');


//***********näytä kaikki */
exports.findAll = function (req, res) {
    Koira.findAll(function (err, koira) {
        if (err){
            res.send(err);
        console.log('Koirat löydetty EPÄonnistuneesti - controllerr')
        }
        else {
            console.log('Löytyi onnistuneesti kaikki koirat: - controller', koira);
        res.send(koira);
        }
    });
};
//*****************luo koira */
exports.create = function (req, res) {
    const new_dog = new Koira(req.body);
    // Jos käyttäjä syöttää tyhjiä kenttiä
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Kaikki kentät vaaditaan' });
    } else {
        Koira.create(new_dog, function (err, koira) {
            if (err){
                res.send(err);
        console.log('Koira lisätty EPÄonnistuneesti - controller')
            }
            else {
                res.json({ error: false, message: "Koira lisätty onnistuneesti - controller", data: koira });
                
    console.log("Koira lisätty onnistuneesti- controller");
            }
            });
    }
};
//************************ find by id */
exports.findById = function (req, res) {
    Koira.findById(req.params.id, function (err, koira) {
        if (err){
            res.send(err);
        console.log('Koirat löydetty EPÄonnistuneesti by id - controllerr')
        }
        else{
            res.json(koira);
    console.log("Koira löytyi onnistuneesti by id - controller", koira);
        }
        });
};
//***********************päivitä */
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Kaikki kentät vaaditaan' });
    } else {
        Koira.update(req.params.id, new Koira(req.body), function (err, koira) {
            if (err){
                res.send(err);
        console.log('Koirat päivitetty EPÄonnistuneesti by id - controllerr')
            }
            else {
            res.json({ error: false, message: 'Koira päivitetty onnistuneesti - controller' });
            // req.body palauttaa pyynnön kutsusta osan: body
    console.log("Koira päivitetty onnistuneesti by id - controller", req.body);
            }
        });
    }
};
//***************************** poista */
exports.delete = function (req, res) {
    Koira.delete(req.params.id, function (err, koira) {
        if (err) {
            res.send(err);
            
        console.log('Koirat poistettu EPÄonnistuneesti by id - controllerr')
        }
        else {
        res.json({ error: false, message: 'Koira poistettu onnistuneesti - controller' });
    console.log("Koira poistettu onnistuneesti by id - controller. ID:" , req.params.id);
        }
    });
};