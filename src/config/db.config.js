const database = require('./.env')

const Sequelize = require("sequelize");

const sequelize = new Sequelize(database.DB, database.USER, database.PASSWORD, {
  host: database.HOST,
  dialect: database.dialect,
  operatorAliases: false,

  pool: {
    max: database.max,
    min: database.pool.min,
    acquire: database.pool.acquire,
    idle: database.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
 
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});


module.exports = db;
