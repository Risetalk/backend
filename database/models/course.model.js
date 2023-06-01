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
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    language:{
      type: DataTypes.ENUM,
      values: ['spanish', 'english', 'french', 'portuguese']
    },
    background_image: {
      type: DataTypes.STRING,
    },
    like:{
      type:DataTypes.INTEGER,
      allowNull:true,
      defaultValue:0
    },
    dislike:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
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
