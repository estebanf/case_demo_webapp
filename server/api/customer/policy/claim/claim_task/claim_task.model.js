'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('claim_task', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  },{
    underscored: true,
    underscoredAll: true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
}
