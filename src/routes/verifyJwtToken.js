const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const db = require('../config/db.config.js');
const Role = db.role;
const User = db.user;

    // löytyykö token headeristä? Onko se kelvollinen
verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
  
	if (!token){
		return res.status(403).send({ 
			auth: false, message: 'Ei kelvollinen token.' 
		});
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			return res.status(500).send({ 
					auth: false, 
					message: 'Epäonnistui Authentication. Virhe -> ' + err 
				});
		}
		req.userId = decoded.id;
		next();
	});
}
    // testaa ADMIN käyttöoikeus löytyykö
isAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	// etsitään käyttäjä by id
	User.findByPk(req.userId)
		.then(user => {
			// tarkistetaan käyttäjän rooli
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){
					console.log(roles[i].name);
					// onko admin vai ei?
					if(roles[i].name.toUpperCase() === "ADMIN"){
						next();
						return;
					}
				}
				// jos ei ole ADMIN, kerrotaan että ADMIN rooli vaaditaan
				res.status(403).send("Vaaditaan ADMIN rooli!");
				return;
			})
		})
}
    // testaa ADMIN/PM käyttöoikeus löytyykö, JOMPI KUMPI vaaditaan
isPmOrAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	User.findByPk(req.userId)
		.then(user => {
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){					
					if(roles[i].name.toUpperCase() === "PM"){
						next();
						return;
					}
					
					if(roles[i].name.toUpperCase() === "ADMIN"){
						next();
						return;
					}
				}
				
				res.status(403).send("Require PM or Admin Roles!");
			})
		})
}

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin = isAdmin;
authJwt.isPmOrAdmin = isPmOrAdmin;

module.exports = authJwt;