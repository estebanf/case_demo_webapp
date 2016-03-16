'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Policy', {
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
  });
}
