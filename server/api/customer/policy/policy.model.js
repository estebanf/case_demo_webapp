'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('policy', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    reference: DataTypes.STRING,
    amount: DataTypes.DOUBLE,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    active: DataTypes.BOOLEAN
  },{
    underscored: true,
    underscoredAll: true,
    createdAt:'created_at',
    updatedAt:'updated_at'
  });
}
