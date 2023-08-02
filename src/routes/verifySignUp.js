const db = require('../config/db.config.js');
const config = require('../config/config.js');
const ROLEs = config.ROLEs; 
const User = db.user;
const Role = db.role;


// Kun ollaan rekisteröimässä kähyttäjää, tarkistetaan onko duplicaatti tietoja
checkDuplicateUserNameOrEmail = (req, res, next) => {
	// -> onko Username(käyttäjänimi) käytössä
	User.findOne({
		where: {
			username: req.body.username
		} 
	}).then(user => {
		if(user){
			res.status(400).send("Virhe! Username jo käytössä");
			return;
		}
		
		// -> onko email käytössä
		User.findOne({ 
			where: {
				email: req.body.email
			} 
		}).then(user => {
			if(user){
				res.status(400).send("Virhe! Email jo käytössä");
				return;
			}
				
			next();
		});
	});
}
// onko ADMIN, PM, USER rooli vai joku muu virhe syöte
checkRolesExisted = (req, res, next) => {
		for(let i=0; i<req.body.roles.length; i++){
			if(!ROLEs.includes(req.body.roles[i].toUpperCase())){
				res.status(400).send("Virhe! Roolia ei ole olemassa = " + req.body.roles[i]);
				return;
			}
		}

	next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;