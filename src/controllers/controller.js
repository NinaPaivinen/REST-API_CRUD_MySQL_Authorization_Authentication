const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// REKISTERÖIDY 
exports.signup = (req, res) => {

	console.log("Rekisteröityminen käynnissä.");
	
	// req.body tiedot käyttäjästä
	User.create({
		name: req.body.name,
		username: req.body.username,
		email: req.body.email,
		// salasana kryptataan tietokantaan
		password: bcrypt.hashSync(req.body.password, 8)
	}).then(user => {
		Role.findAll({
		  where: {
			name: {
			  [Op.or]: req.body.roles
			}
		  }
		}).then(roles => {
			user.setRoles(roles).then(() => {
					let message = "Käyttäjä nimeltä: " + req.body.name + " on rekisteröity onnistuneesti!"
					res.send(message);
        });
		}).catch(err => {
			res.status(500).send("Virhe -> " + err);
		});
	}).catch(err => {
		res.status(500).send("Virhe! -> " + err);
	})
}

// KIRJAUDU
exports.signin = (req, res) => {
	console.log("Sign-In");
	
	User.findOne({
		where: {
			username: req.body.username
		},
		attributes: ['id', 'username', 'email', 'password'],
		include: [{
			model: Role,
			attributes: ['id', 'name'],
			through: {
				attributes: ['userId', 'roleId'],
			}
		}]
	}).then(user => {
		if (!user) {
			return res.status(404).send('Käyttäjää ei löydy.');
		}

		const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
		if (!passwordIsValid) {
			return res.status(401).send({ auth: false, accessToken: null, reason: "Väärä salasana!" });
		}
		
		const token = jwt.sign({ id: user.id }, config.secret, {
		  expiresIn: 86400 // TOKEN vanhenee 24 tunnissa!
		});

		// onnistuneen rekisteröinnin jälkeen Palvelin palauttaa tokenin käyttäjälle.
		res.status(200).send({ auth: true, user: user, accessToken: token });
	}).catch(err => {
		res.status(500).send('Error -> ' + err);
	});
}

// voit testata toimiiko USER käyttötason oikeus
exports.userContent = (req, res) => {
	res.status(200).send(">>> User sisältö!");
}

// voit testata toimiiko ADMIN käyttötason oikeus
exports.adminBoard = (req, res) => {
	res.status(200).send(">>> Admin sisältö!");
}

// voit testata toimiiko PM käyttötason oikeus
exports.managementBoard = (req, res) => {
	res.status(200).send(">>> PM sisältö!");
}