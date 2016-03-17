'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Claim', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: DataTypes.STRING,
    date_incident: DataTypes.DATE,
    date_reported: DataTypes.DATE,
    status: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
}
