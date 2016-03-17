'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('ClaimDocument', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    info: DataTypes.STRING,
    url: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
}
