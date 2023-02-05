module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
        type: type.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    username: type.STRING(25),
    email: type.STRING(100),
    password: type.STRING(150)
  });
};
