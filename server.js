// pää käynnistys tiedosto

// moduulit (module) käyttöön
// express on Node.js:n verkkokehys/web framework
const express = require('express');

// luodaan express app
const app = express();

// json käyttöön expressille
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// load in the environment consts
//require('dotenv').config({silent: true})

//const logger = require('morgan');

// määritetään root reitti(route) UNPROTECTED
app.get('/', (req, res) => {
  res.send("Hello World by NinaP");
  console.log("Hey by NinaP")
});

// reitit vaaditaan
//const koiratRoutes = require('./src/routes/koirat.routes')

// käytetään middleware, määritetään end-point
//app.use('/koirat_api', koiratRoutes);

//require("./src/routes/auth.routes.js")(app);


// asetaan palvelimen portti
// portti löytyy .env tiedostost

const db = require('./src/config/db.config.js');

const Role = db.role;
  
// force: true will drop the table if it already exists
// pakko-tiputetaan tietokannan taulu, jos on jo valmiina olemassa
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  // käytetään tiedoston ala-osassa olevaa initial functiota
  initial();
});	
// servun portti osoite
const port = 8080;  // || 8080;

require("./src/routes/koirat.routes.js")(app);

// käynnistää serveri
const server = app.listen(8080, function () {
 
  const host = server.address().address
  const port = server.address().port
 
  console.log("Serveri toimii osoitteessa : http://%s:%s", host, port)
})


function initial(){
	Role.create({
		id: 1,
		name: "USER"
	});
	
	Role.create({
		id: 2,
		name: "ADMIN"
	});
	
	Role.create({
		id: 3,
		name: "PM"
	});
}