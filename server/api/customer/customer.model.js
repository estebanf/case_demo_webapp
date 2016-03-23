'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('customer', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  },{
    underscored: true,
    underscoredAll: true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
}
