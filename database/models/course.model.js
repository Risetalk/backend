// Third Party Dependencies.
const { DataTypes } = require("sequelize");

// Local Dependencies.
const sequelize = require("../index");

// Course Model.
const Course = sequelize.define(
  "course",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.TEXT,
    },
    background_image: {
      type: DataTypes.STRING,
    },
    released_date: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    // No pluralization.
    freezeTableName: true,
  }
);

module.exports = Course;
