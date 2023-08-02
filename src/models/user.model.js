module.exports = (sequelize, Sequelize) => {

  // määritetään käyttäjä
  const User = sequelize.define("users", {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });

	User.prototype.toJSON =  function () {
const values = Object.assign({}, this.get());
	
		delete values.password;
		return values;
	}
	
	return User;
}