const verifySignUp = require('./verifySignUp.js');
const authJwt = require('./verifyJwtToken.js');

module.exports = function(app) {

const controller = require('../controllers/controller.js');
 
const koiratController = require('../controllers/koirat.controller');

// näytä kaikki koirat
app.get('/koirat_api/', [authJwt.verifyToken, authJwt.isAdmin], koiratController.findAll);

// luo uusi koirat POST METHOD
app.post('/koirat_api/', [authJwt.verifyToken, authJwt.isAdmin], koiratController.create);

// näytä koira by id GET METHOD
app.get('/koirat_api/:id', [authJwt.verifyToken, authJwt.isAdmin], koiratController.findById);

// päivitä koira by id PUT METHOD
app.put('/koirat_api/:id', [authJwt.verifyToken, authJwt.isAdmin], koiratController.update);

// poista koira by id DELTE METHOD

app.delete('/koirat_api/:id', [authJwt.verifyToken, authJwt.isAdmin], koiratController.delete);

/* POSTMAN - POST - http://localhost:8080/api/auth/signup
{
    "username": "admin",
    "name": "nina",
    "email": "fddgagaa",
    "roles": ["ADMIN"],
    "password": "admin"
}
*********************REKISTERÖIDY*/

app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
	
/* POSTMAN - POST - http://localhost:8080/api/auth/signin
{
    "username": "admin",
    "password": "admin"
}
********************KIRJAUDU*/

	app.post('/api/auth/signin', controller.signin);
	
    // testaa USER käyttöoikeutta
	app.get('/api/test/user', [authJwt.verifyToken], controller.userContent);

 // testaa PM käyttöoikeutta
	app.get('/api/test/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);

// testaa ADMIN käyttöoikeutta
	app.get('/api/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
}


