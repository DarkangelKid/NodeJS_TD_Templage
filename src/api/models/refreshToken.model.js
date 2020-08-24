const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define(
    'refreshToken',
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
      },
      expires: {
        type: DataTypes.DATE,
      },
    },
    {
      freezeTableName: true,
    },
  );

  return RefreshToken;
};
