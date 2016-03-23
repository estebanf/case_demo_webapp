'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('claim', {
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
  },{
    underscored: true,
    underscoredAll: true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
}
