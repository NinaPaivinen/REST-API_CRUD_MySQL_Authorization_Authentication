module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    // määritetään rooli
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });

  return Role;
};
