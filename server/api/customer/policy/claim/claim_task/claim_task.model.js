'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('ClaimTask', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
}
